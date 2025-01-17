import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse w-[60vw] rounded-md bg-slate-100 dark:bg-slate-800", className)} {...props} />;
}

export { Skeleton };
