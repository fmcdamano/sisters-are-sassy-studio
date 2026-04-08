import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, id, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        <input
          id={id}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-btn border bg-white px-4 py-2 text-sm text-charcoal placeholder:text-gray-400",
            "border-light-gray focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-studio-error focus:ring-studio-error",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-studio-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
