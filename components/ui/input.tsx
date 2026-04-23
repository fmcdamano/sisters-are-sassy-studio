import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          id={id}
          type={type}
          className={cn(
            "w-full h-11 border-0 border-b border-cream-deep bg-transparent px-0 py-2 text-ink placeholder:text-ink-muted/50 focus-visible:outline-none focus-visible:border-ink transition-colors duration-200",
            error && "border-studio-error focus-visible:border-studio-error",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error && id ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={id ? `${id}-error` : undefined} className="mt-1 text-xs text-studio-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
