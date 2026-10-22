"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">AN UNEXPECTED PAUSE</span>
      <h1>Something didn’t load.</h1>
      <p>Give it another try.</p>
      <button className="button button-primary" onClick={reset}>
        Try again ↗
      </button>
    </main>
  );
}
