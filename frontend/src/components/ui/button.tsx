import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white shadow-lg hover:bg-gradient-to-r hover:from-[#3CB371] hover:to-[#2E8B57] hover:shadow-xl hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu",
        destructive:
          "bg-gradient-to-r from-[#FF4D4D] to-[#FF6B6B] text-white shadow-lg hover:bg-gradient-to-r hover:from-[#FF6B6B] hover:to-[#FF4D4D] hover:shadow-xl hover:scale-105 hover:-rotate-1 hover:skew-x-2 transform-gpu",
        outline:
          "border border-[#8FBC8F] bg-transparent text-[#2E8B57] shadow-lg hover:bg-[#8FBC8F] hover:text-white hover:shadow-xl hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu",
        secondary:
          "bg-gradient-to-r from-[#6C757D] to-[#8E9AA2] text-white shadow-lg hover:bg-gradient-to-r hover:from-[#8E9AA2] hover:to-[#6C757D] hover:shadow-xl hover:scale-105 hover:-rotate-1 hover:skew-x-2 transform-gpu",
        ghost:
          "bg-transparent text-[#2E8B57] hover:bg-[#8FBC8F] hover:text-white hover:shadow-lg hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu",
        link: "text-[#2E8B57] underline-offset-4 hover:underline hover:scale-105",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg hover:bg-white/20 hover:shadow-xl hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };