import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("border-b border-border/60 bg-muted/30", className)}>
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-36 sm:pb-20">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
