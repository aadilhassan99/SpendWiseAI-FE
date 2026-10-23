import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <label className="field">
      {label && <span>{label}</span>}
      <input
        ref={ref}
        id={id}
        className={cn("input", error && "input-error", className)}
        {...props}
      />
      {error && <small className="field-error">{error}</small>}
    </label>
  ),
);
Input.displayName = "Input";
