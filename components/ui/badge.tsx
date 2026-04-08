import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-teal/15 text-teal",
        coral: "bg-coral/15 text-coral",
        peach: "bg-peach/40 text-charcoal",
        outline: "border border-light-gray text-charcoal",
        confirmed: "bg-studio-success/15 text-studio-success",
        pending: "bg-yellow-100 text-yellow-700",
        "scope-change": "bg-blue-100 text-blue-700",
        reschedule: "bg-orange-100 text-orange-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
