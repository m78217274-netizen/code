import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-line bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5", className)}>
      {children}
    </div>
  );
}
