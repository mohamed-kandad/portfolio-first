"use client";
import { useEffect, useRef } from "react";
import { hero } from "@/content/hero";
type Cell = { x: number; y: number; index: number; color: string };
const ramp = " .:/<+{0#@";
const clamp = (min: number, max: number, value: number) =>
  Math.max(min, Math.min(max, value));
export function HeroPortrait() {
  const panel = useRef<HTMLElement>(null),
    canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const root = panel.current,
      output = canvas.current;
    if (!root || !output) return;
    const ctx = output.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    let disposed = false,
      visible = true,
      raf = 0,
      resizeTimer: ReturnType<typeof setTimeout>;
    let width = 0,
      height = 0,
      radius = 100,
      homeX = 0,
      homeY = 0,
      currentX = 0,
      currentY = -200,
      inside = false,
      pointerX = 0,
      pointerY = 0;
    let cells: Cell[] = [],
      cellW = 10,
      cellH = 13,
      lastFlicker = 0,
      start = performance.now(),
      initialized = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)"),
      fine = window.matchMedia("(pointer: fine)");
    const drawCell = (cell: Cell, index = cell.index) => {
      ctx.clearRect(cell.x, cell.y, cellW, cellH);
      ctx.fillStyle = cell.color;
      ctx.fillText(ramp[index], cell.x, cell.y);
    };
    const setLens = () => {
      root.style.setProperty("--mx", `${currentX}px`);
      root.style.setProperty("--my", `${currentY}px`);
      root.style.setProperty("--r", `${radius}px`);
    };
    const rebuild = () => {
      if (disposed || !image.naturalWidth) return;
      width = root.clientWidth;
      height = root.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      output.width = Math.round(width * dpr);
      output.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      cellW = width < 500 ? 8 : 10;
      cellH = 13;
      const cols = Math.ceil(width / cellW),
        rows = Math.ceil(height / cellH);
      const small = document.createElement("canvas");
      small.width = cols;
      small.height = rows;
      const sample = small.getContext("2d", { willReadFrequently: true });
      if (!sample) return;
      const scale = Math.max(
          width / image.naturalWidth,
          height / image.naturalHeight,
        ),
        dw = image.naturalWidth * scale,
        dh = image.naturalHeight * scale;
      const dx = (width - dw) * 0.5,
        dy = (height - dh) * hero.portrait.objectPositionY;
      sample.drawImage(
        image,
        (dx / width) * cols,
        (dy / height) * rows,
        (dw / width) * cols,
        (dh / height) * rows,
      );
      const pixels = sample.getImageData(0, 0, cols, rows).data;
      ctx.font = `${cellW === 8 ? 10 : 12}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      cells = [];
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++) {
          const n = (row * cols + col) * 4,
            r = pixels[n],
            g = pixels[n + 1],
            b = pixels[n + 2],
            x = col * cellW,
            y = row * cellH;
          if (r - g > 105 && b < 85) {
            if ((row + col) % 3 === 0) {
              ctx.fillStyle = "rgba(255,107,53,.22)";
              ctx.fillText("·", x, y);
            }
            continue;
          }
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255,
            L = clamp(0.14, 1, (lum - 0.04) / 0.75);
          const cell = {
            x,
            y,
            index: Math.round(L * (ramp.length - 1)),
            color: L > 0.7 ? "#F5F5F2" : L > 0.38 ? "#FF6B35" : "#8a4126",
          };
          cells.push(cell);
          drawCell(cell);
        }
      homeX = dx + dw * hero.portrait.faceX;
      homeY = dy + dh * hero.portrait.faceY;
      radius = clamp(86, 170, width * 0.25);
      if (!initialized || reduce.matches) {
        currentX = homeX;
        currentY = reduce.matches ? homeY : -radius * 1.5;
        initialized = true;
      }
      setLens();
      root.dataset.ready = "true";
    };
    const tick = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden || reduce.matches) return;
      const elapsed = now - start,
        driftX = Math.sin(elapsed * 0.00024) * width * 0.08,
        driftY = Math.cos(elapsed * 0.00031) * height * 0.04;
      const tx = inside ? pointerX : homeX + driftX,
        ty =
          elapsed < 1300 ? -radius * 1.5 : inside ? pointerY : homeY + driftY;
      const ease = elapsed < 3500 ? 0.025 : 0.14;
      currentX += (tx - currentX) * ease;
      currentY += (ty - currentY) * ease;
      setLens();
      if (now - lastFlicker > 110 && cells.length) {
        for (let i = 0; i < 45; i++) {
          const cell = cells[Math.floor(Math.random() * cells.length)];
          drawCell(
            cell,
            clamp(
              0,
              ramp.length - 1,
              cell.index + (Math.random() < 0.5 ? -1 : 1),
            ),
          );
        }
        lastFlicker = now;
      }
      raf = requestAnimationFrame(tick);
    };
    const resume = () => {
      if (visible && !document.hidden && !reduce.matches && !raf && !disposed)
        raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onMotion = () => {
      pause();
      rebuild();
      resume();
    };
    const visibility = () => {
      if (document.hidden) pause();
      else resume();
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduce.matches) return;
      const bounds = root.getBoundingClientRect();
      inside = true;
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
    };
    const leave = () => {
      inside = false;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume();
      else pause();
    });
    observer.observe(root);
    const size = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(rebuild, 100);
    });
    size.observe(root);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", onMotion);
    image.onload = () => {
      if (disposed) return;
      start = performance.now();
      rebuild();
      resume();
    };
    image.src = hero.portrait.src;
    return () => {
      disposed = true;
      pause();
      clearTimeout(resizeTimer);
      observer.disconnect();
      size.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      reduce.removeEventListener("change", onMotion);
      image.onload = null;
    };
  }, []);
  return (
    <figure ref={panel} className="panel" aria-label={hero.portrait.alt}>
      <canvas ref={canvas} className="code-portrait" aria-hidden="true" />
      {/* A plain image is required here for the pixel-aligned CSS lens mask. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="lens-photo"
        src={hero.portrait.src}
        alt=""
        width={hero.portrait.width}
        height={hero.portrait.height}
        fetchPriority="high"
        loading="eager"
      />
      <div className="lens-ring" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <span>{"<MK />"}</span>
      </div>
      <svg className="portrait-badge" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="badge-circle"
            d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#111318" stroke="#34373e" />
        <text className="badge-type">
          <textPath href="#badge-circle" textLength="282">
            {hero.badge}
          </textPath>
        </text>
        <text x="60" y="69" textAnchor="middle" className="badge-mk">
          MK
        </text>
      </svg>
      <figcaption>
        <span>{hero.caption}</span>
        <small>{hero.hint}</small>
      </figcaption>
    </figure>
  );
}
