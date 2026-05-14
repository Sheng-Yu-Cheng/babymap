import { MapPin } from "lucide-react";

import { Section } from "@/components/Section";
import { childcareResources } from "@/data/babymap";

export function ResourceMapSection() {
  return (
    <Section
      id="resources"
      eyebrow="托育資源地圖"
      title="讓附近的支持變得看得見"
      description="MVP 使用假地圖面板與資源列表，先建立資訊層級，後續再決定是否接真實地圖服務。"
      className="bg-white/48"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-border bg-secondary p-6 shadow-sm">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative z-10 rounded-2xl bg-white/82 p-4 text-sm text-muted-foreground">
            台北市大安區附近資源 Demo
          </div>
          {childcareResources.map((resource) => (
            <div
              key={resource.id}
              className={`absolute ${resource.position} z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md`}
              title={resource.name}
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {childcareResources.map((resource) => (
            <article key={resource.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-primary">{resource.type}</p>
                  <h3 className="mt-1 text-lg font-semibold">{resource.name}</h3>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {resource.distance}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium">{resource.status}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
