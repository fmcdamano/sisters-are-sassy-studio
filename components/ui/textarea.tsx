import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[100px] w-full rounded-btn border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400",
            "border-light-gray focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors",
            error && "border-studio-error focus:ring-studio-error",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-studio-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
