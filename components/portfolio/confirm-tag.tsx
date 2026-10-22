import { site } from "@/content/site";
export function ConfirmTag({ children }: { children?: React.ReactNode }) {
  return (
    <span className="confirm-tag">
      {children ? <>{children} · </> : null}
      {site.confirm}
    </span>
  );
}
