import { site } from "@/content/site";
export function ConfirmTag({
  children,
  label = site.confirm,
}: {
  children?: React.ReactNode;
  label?: string;
}) {
  return (
    <span className="confirm-tag">
      {children ? <>{children} · </> : null}
      {label}
    </span>
  );
}
