import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  accentColor?: string;
  hoverable?: boolean;
}

export function Card({
  selected,
  accentColor,
  hoverable = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-card transition-all duration-200",
        hoverable && "cursor-pointer",
        // Default state
        !selected && "border-2 border-transparent shadow-card",
        hoverable && !selected && "hover:shadow-card-hover hover:-translate-y-0.5",
        // Selected state
        selected && "border-2 shadow-card-hover -translate-y-0.5",
        className
      )}
      style={
        selected && accentColor
          ? { borderColor: accentColor, boxShadow: `0 8px 32px ${accentColor}40` }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}
