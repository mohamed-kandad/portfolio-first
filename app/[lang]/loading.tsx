export default function Loading() {
  return (
    <main
      id="main"
      className="page-loading"
      aria-busy="true"
      aria-label="Loading"
    >
      <span className="monogram" dir="ltr">
        MK<span>.</span>
      </span>
      <div className="loading-line" />
    </main>
  );
}
