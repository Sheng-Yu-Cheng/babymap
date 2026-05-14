"use client";

import { Baby, Building2, HeartPulse, Home, Milk, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { Section } from "@/components/Section";
import { childcareResources } from "@/data/babymap";
import { cn } from "@/lib/utils";

const resourceTypes = ["全部", "公托", "準公托", "保母", "親子館", "哺乳室", "小兒科"];

const markerStyles = {
  公托: {
    icon: Building2,
    className: "bg-primary text-primary-foreground",
  },
  準公托: {
    icon: Home,
    className: "bg-secondary text-secondary-foreground",
  },
  保母: {
    icon: Baby,
    className: "bg-foreground text-primary-foreground",
  },
  親子館: {
    icon: Users,
    className: "bg-accent text-accent-foreground",
  },
  哺乳室: {
    icon: Milk,
    className: "bg-white text-primary",
  },
  小兒科: {
    icon: HeartPulse,
    className: "bg-[#f9d7d0] text-[#7a2c20]",
  },
};

function getMarkerStyle(type: string) {
  return markerStyles[type as keyof typeof markerStyles] ?? markerStyles.親子館;
}

export function ResourceMapSection() {
  const [region, setRegion] = useState("台北市大安區");
  const [resourceType, setResourceType] = useState("全部");
  const [openOnly, setOpenOnly] = useState(true);
  const [reservableOnly, setReservableOnly] = useState(false);
  const [subsidizedOnly, setSubsidizedOnly] = useState(false);

  const filteredResources = useMemo(
    () =>
      childcareResources.filter((resource) => {
        if (resource.region !== region) return false;
        if (resourceType !== "全部" && resource.type !== resourceType) return false;
        if (openOnly && !resource.isOpen) return false;
        if (reservableOnly && !resource.reservable) return false;
        if (subsidizedOnly && !resource.subsidized) return false;
        return true;
      }),
    [openOnly, region, reservableOnly, resourceType, subsidizedOnly],
  );

  return (
    <Section
      id="resources"
      eyebrow="托育資源地圖"
      title="查得到，也用得到"
      description="用靜態 mock map 呈現附近托育、照護、親子空間與醫療資源。這裡不使用真實地圖 API。"
      className="bg-white/48"
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-[1.75rem] border border-border bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h3 className="text-lg font-semibold">篩選附近資源</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            先找到能用的資源，再決定要預約、聯絡或加入規劃。
          </p>

          <div className="mt-5 space-y-5">
            <label className="block text-sm font-medium">
              地區
              <select
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
              >
                <option>台北市大安區</option>
              </select>
            </label>

            <div>
              <p className="text-sm font-medium">資源類型</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {resourceTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setResourceType(type)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm font-medium transition",
                      resourceType === type
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white text-foreground hover:border-primary",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <FilterToggle active={openOnly} onClick={() => setOpenOnly((value) => !value)}>
                是否開放中
              </FilterToggle>
              <FilterToggle active={reservableOnly} onClick={() => setReservableOnly((value) => !value)}>
                是否可預約
              </FilterToggle>
              <FilterToggle active={subsidizedOnly} onClick={() => setSubsidizedOnly((value) => !value)}>
                是否有補助
              </FilterToggle>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-border bg-secondary p-5 shadow-soft">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.48)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.48)_1px,transparent_1px)] bg-[size:52px_52px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,.8),transparent_18rem),radial-gradient(circle_at_75%_70%,rgba(191,230,255,.55),transparent_16rem)]" />

            <div className="relative z-10 flex flex-col gap-3 rounded-3xl bg-white/88 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Mock map · {region}</p>
                <h3 className="mt-1 text-xl font-semibold">附近可用資源 {filteredResources.length} 個</h3>
              </div>
              <p className="text-sm text-muted-foreground">靜態地圖示意，無真實定位。</p>
            </div>

            {filteredResources.map((resource) => {
              const marker = getMarkerStyle(resource.type);
              const MarkerIcon = marker.icon;

              return (
                <button
                  key={resource.id}
                  type="button"
                  className={`absolute ${resource.position} z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-md ${marker.className}`}
                  title={resource.name}
                >
                  <MarkerIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              );
            })}

            <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap gap-2 rounded-3xl bg-white/88 p-3 shadow-sm">
              {Object.entries(markerStyles).map(([type, marker]) => {
                const MarkerIcon = marker.icon;

                return (
                  <span key={type} className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-xs font-medium">
                    <span className={cn("flex h-6 w-6 items-center justify-center rounded-full", marker.className)}>
                      <MarkerIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {type}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">附近資源列表</h3>
                <p className="mt-1 text-sm text-muted-foreground">每個項目都提供下一步動作，不只查得到。</p>
              </div>
              <span className="text-sm font-medium text-primary">{filteredResources.length} 筆結果</span>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredResources.map((resource) => (
                <article key={resource.id} className="rounded-[1.5rem] border border-border bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-primary">{resource.type}</p>
                      <h3 className="mt-1 text-lg font-semibold">{resource.name}</h3>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {resource.distance}
                    </span>
                  </div>
                  <p className="mt-3 inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                    {resource.status}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    {resource.action}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FilterToggle({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white text-foreground",
      )}
    >
      {children}
      <span className="text-xs opacity-75">{active ? "是" : "否"}</span>
    </button>
  );
}
