import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  Search,
  Bell,
  ScanLine,
  Package,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { visualCopy, work, type Project } from "@/content/projects";
export function ProjectVisual({
  kind,
  large = false,
}: {
  kind: Project["kind"];
  large?: boolean;
}) {
  if (kind === "mobile")
    return (
      <div
        aria-hidden="true"
        className={`project-art mobile-art ${large ? "large" : ""}`}
      >
        <span className="mockup-corner">REACT NATIVE / EXPO</span>
        <div className="phone phone-back">
          <div className="phone-island" />
          <div className="phone-brand">{visualCopy.mobile.brand}</div>
          <div className="phone-asterisk">✳</div>
          <div className="skeleton light wide" />
          <div className="skeleton light" />
          <div className="phone-bottom-brand">REWARDS / STAFF</div>
        </div>
        <div className="phone phone-front">
          <div className="phone-island" />
          <div className="phone-top">
            <span>{visualCopy.mobile.brand}</span>
            <Bell size={13} />
          </div>
          <div className="phone-screens">
            {visualCopy.mobile.screens.map((screen, i) => (
              <div className={`phone-screen screen-${i}`} key={screen}>
                <small>{screen}</small>
                <h4>
                  {
                    [
                      visualCopy.mobile.scan,
                      visualCopy.mobile.customer,
                      visualCopy.mobile.history,
                    ][i]
                  }
                </h4>
                {i === 0 ? (
                  <div className="scan-target">
                    <ScanLine />
                  </div>
                ) : (
                  <div className="phone-skeletons">
                    <div className="skeleton wide" />
                    <div className="skeleton" />
                    <div className="skeleton wide" />
                    <div className="skeleton" />
                  </div>
                )}
                <div className="phone-action">
                  {screen}
                  <ArrowUpRight size={13} />
                </div>
              </div>
            ))}
          </div>
          <div className="phone-tabs">
            <LayoutDashboard size={14} />
            <ScanLine size={14} />
            <Users size={14} />
          </div>
        </div>
        <div className="mock-notification">
          <span>
            <Check size={13} />
          </span>
          <div>
            <b>{visualCopy.mobile.notification}</b>
            <small>{visualCopy.mobile.note}</small>
          </div>
        </div>
        <span className="visual-note">{work.visualNote}</span>
      </div>
    );
  const copy = kind === "school" ? visualCopy.school : visualCopy.products;
  return (
    <div
      aria-hidden="true"
      className={`project-art dashboard-art ${kind === "school" ? "school-art" : "products-art"} ${large ? "large" : ""}`}
    >
      <div className="browser-mock">
        <div className="browser-chrome">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>{copy.brand}</span>
          <ArrowUpRight size={10} />
        </div>
        <div className="dashboard-shell">
          <aside className="mock-sidebar">
            <div className="mock-brand">
              {kind === "school" ? (
                <BookOpen size={17} />
              ) : (
                <Package size={17} />
              )}
              <b>{copy.brand}</b>
            </div>
            {copy.nav.map((label, i) => (
              <div key={label} className={i === 0 ? "selected" : ""}>
                {i === 0 ? (
                  <LayoutDashboard size={12} />
                ) : i === 1 ? (
                  <Users size={12} />
                ) : (
                  <CalendarDays size={12} />
                )}
                <span>{label}</span>
              </div>
            ))}
          </aside>
          <div className="mock-content">
            <div className="mock-top">
              <span>{copy.nav[0]}</span>
              <span>
                <Search size={11} />
                <Bell size={11} />
              </span>
            </div>
            <h4>{copy.heading}</h4>
            <div className="mock-stats">
              {copy.tiles.map((label) => (
                <div key={label}>
                  <small>{label}</small>
                  <b>—</b>
                  <div className="skeleton" />
                </div>
              ))}
            </div>
            <div className="mock-panels">
              <div className="mock-chart">
                <b>{copy.chart}</b>
                <div className="bar-chart">
                  {[40, 67, 48, 78, 61, 88, 70, 95, 82].map((height, i) => (
                    <i
                      key={i}
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mock-activity">
                <b>{copy.side}</b>
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <span />
                    <div>
                      <i className="skeleton wide" />
                      <i className="skeleton" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="visual-note">{work.visualNote}</span>
    </div>
  );
}
