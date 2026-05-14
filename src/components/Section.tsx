import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("px-4 py-16 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-6xl">
        {title ? (
          <div className="mb-8 max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>
            ) : null}
            <h2 className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
