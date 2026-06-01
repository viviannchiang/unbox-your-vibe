import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-heading font-bold lowercase tracking-wide transition-all duration-200 active:scale-[0.97]",
        // size
        size === "sm" && "px-6 py-2 text-sm",
        size === "md" && "px-8 py-3 text-base",
        size === "lg" && "px-10 py-4 text-base",
        // variant
        variant === "primary" &&
          "bg-text text-background shadow-card hover:scale-[1.02] hover:shadow-card-hover",
        variant === "ghost" &&
          "text-text hover:bg-text/5",
        variant === "outline" &&
          "border-2 border-text/20 text-text hover:border-text/40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
