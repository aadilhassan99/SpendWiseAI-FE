import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => (
    <label className="field">
      {label && <span>{label}</span>}
      <select
        ref={ref}
        className={cn("input", error && "input-error", className)}
        {...props}
      >
        {children}
      </select>
      {error && <small className="field-error">{error}</small>}
    </label>
  ),
);
Select.displayName = "Select";
