import type { LucideIcon } from "lucide-react";

type InfoCardProps = {
  title: string;
  description: string;
  tag?: string;
  icon?: LucideIcon;
};

export function InfoCard({ title, description, tag, icon: Icon }: InfoCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-white/78 p-5 shadow-sm">
      {Icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      ) : null}
      {tag ? (
        <p className="mb-2 text-sm font-medium text-primary">{tag}</p>
      ) : null}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}
