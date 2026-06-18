import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-bold transition-all border-[3px] border-black select-none cursor-pointer focus:outline-none",
          // Variants
          variant === "primary" && 
            "bg-[#39d353] text-black shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000000]",
          variant === "secondary" && 
            "bg-[#0d1117] text-white shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-0.5 hover:bg-[#161b22] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000000]",
          variant === "danger" && 
            "bg-[#0d1117] text-[#f85149] hover:bg-[#f85149] hover:text-black hover:border-black active:translate-y-0.5 transition-colors",
          variant === "ghost" && 
            "border-transparent bg-transparent text-[#8b949e] hover:border-black/50 hover:text-white",
          
          // Sizes
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base font-black",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
