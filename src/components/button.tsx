import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  className?: string;
} & ComponentProps<"button">;

const variants = {
  primary:
    "bg-royal text-white shadow-lg shadow-royal/20 hover:bg-blue-800",
  secondary:
    "bg-white text-navy hover:bg-slate-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
  outline:
    "border border-line bg-white text-navy hover:border-royal hover:text-royal dark:border-white/15 dark:bg-transparent dark:text-white",
  ghost:
    "text-navy hover:bg-slate-100 dark:text-white dark:hover:bg-white/10",
  gold:
    "bg-gold text-navy shadow-lg shadow-gold/20 hover:bg-[#c6a231]"
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classNames = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
