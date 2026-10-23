import { Button } from "./button";
import type { ReactNode } from "react";
export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="state">
      <span className="spinner spinner-large" /> <p>{label}</p>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function ErrorState({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="state state-error">
      <h3>Couldn’t load this page</h3>
      <p>{message}</p>
      {retry && (
        <Button variant="secondary" onClick={retry}>
          Try again
        </Button>
      )}
    </div>
  );
}
