import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-lg border bg-white/10 backdrop-blur-md px-3 py-2 text-base shadow-xs transition-all duration-300 ease-in-out outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:scale-105 hover:shadow-lg focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };