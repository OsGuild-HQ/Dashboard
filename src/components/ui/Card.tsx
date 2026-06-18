import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "green" | "black";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glowColor = "green", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative border-[3px] border-black bg-[#0d1117] p-6 transition-all duration-300",
          glowColor === "green" && 
            "shadow-[4px_4px_0px_0px_#238636] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#39d353]",
          glowColor === "black" && 
            "shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#000000]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
