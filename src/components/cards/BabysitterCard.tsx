import { BadgeCheck, Clock, MapPin, ShieldCheck, Star } from "lucide-react";

import type { babysitters } from "@/data/babymap";
import { cn } from "@/lib/utils";

type Babysitter = (typeof babysitters)[number];

type BabysitterCardProps = {
  babysitter: Babysitter;
  selected?: boolean;
  onSelect?: () => void;
};

export function BabysitterCard({ babysitter, selected = false, onSelect }: BabysitterCardProps) {
  return (
    <article
      className={cn(
        "rounded-[1.5rem] border bg-white p-5 shadow-sm transition",
        selected ? "border-primary shadow-soft" : "border-border hover:border-primary",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{babysitter.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{babysitter.experience}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {babysitter.distance}
            </span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          <Star className="h-4 w-4 fill-current" aria-hidden="true" />
          {babysitter.rating}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {babysitter.certification}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {babysitter.availableTime}
        </span>
      </div>

      <p className="mt-4 text-xl font-bold text-foreground">{babysitter.price}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {babysitter.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-secondary-foreground">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        {babysitter.safety.slice(0, 3).join(" · ")}
      </div>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "mt-5 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition",
          selected
            ? "bg-foreground text-primary-foreground"
            : "bg-primary text-primary-foreground hover:opacity-90",
        )}
      >
        {selected ? "已選擇" : "選擇這位保母"}
      </button>
    </article>
  );
}
