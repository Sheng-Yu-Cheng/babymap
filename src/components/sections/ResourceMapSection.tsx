"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { Section } from "@/components/Section";
import type { ChildcareResource } from "@/lib/data/taipeiResources";
import { cn } from "@/lib/utils";

const resourceTypes = ["全部", "托嬰中心", "親子館", "哺集乳室"];

const ResourceLeafletMap = dynamic(
  () => import("@/components/map/ResourceLeafletMap").then((mod) => mod.ResourceLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center rounded-[1.75rem] border border-border bg-secondary text-sm text-secondary-foreground md:h-[520px]">
        載入地圖中...
      </div>
    ),
  },
);

type ResourceMapSectionProps = {
  resources: ChildcareResource[];
  usingFallback?: boolean;
};

export function ResourceMapSection({ resources, usingFallback = false }: ResourceMapSectionProps) {
  const districtOptions = useMemo(() => {
    const districts = resources
      .map((resource) => resource.district)
      .filter((district): district is string => Boolean(district));

    return ["全部", ...Array.from(new Set(districts)).slice(0, 12)];
  }, [resources]);
  const [region, setRegion] = useState("全部");
  const [resourceType, setResourceType] = useState("全部");
  const [openOnly, setOpenOnly] = useState(false);
  const [reservableOnly, setReservableOnly] = useState(false);
  const [realDataOnly, setRealDataOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(resources[0]?.id);

  const filteredResources = useMemo(
    () =>
      resources.filter((resource) => {
        if (region !== "全部" && resource.district !== region) return false;
        if (resourceType !== "全部" && resource.typeLabel !== resourceType) return false;
        if (openOnly && !resource.openingHours) return false;
        if (reservableOnly && resource.typeLabel !== "托嬰中心" && resource.typeLabel !== "親子館") return false;
        if (realDataOnly && !resource.isRealData) return false;
        return true;
      }),
    [openOnly, realDataOnly, region, reservableOnly, resourceType, resources],
  );
  const selectedResource =
    filteredResources.find((resource) => resource.id === selectedId) ?? filteredResources[0];

  return (
    <Section
      id="resources"
      eyebrow="托育資源地圖"
      title="查得到，也用得到"
      description="整合臺北市公開資料，並保留 BabyMap demo 備援。這裡仍使用靜態地圖示意，尚未接入真實地圖 API。"
      className="bg-white/48"
    >
      <div className="mb-6 rounded-[1.5rem] border border-border bg-white p-4 text-sm leading-6 text-muted-foreground shadow-sm">
        <p>部分資料來源：臺北市資料大平臺</p>
        <p className="mt-2">
          地圖點位為 demo 視覺化定位；資源名稱、地址與聯絡資訊來自公開資料或備用資料。
        </p>
        {usingFallback ? (
          <p className="mt-2 text-primary">
            目前顯示 BabyMap demo 資料，公開資料讀取失敗時會自動切換為備用資料。
          </p>
        ) : null}
      </div>

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
                {districtOptions.map((district) => (
                  <option key={district}>{district}</option>
                ))}
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
              <FilterToggle active={realDataOnly} onClick={() => setRealDataOnly((value) => !value)}>
                只看公開資料
              </FilterToggle>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-white p-3 shadow-soft">
            <div className="mb-3 flex flex-col gap-2 px-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">OpenStreetMap · {region}</p>
                <h3 className="mt-1 text-xl font-semibold">附近可用資源 {filteredResources.length} 個</h3>
              </div>
              <p className="text-sm text-muted-foreground">未使用地址即時 geocoding。</p>
            </div>
            <ResourceLeafletMap
              resources={filteredResources}
              selectedId={selectedResource?.id}
              onSelect={setSelectedId}
            />
          </div>

          {selectedResource ? (
            <article className="rounded-[1.5rem] border border-primary bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-primary">目前選取</p>
              <h3 className="mt-1 text-xl font-semibold">{selectedResource.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedResource.typeLabel}
                {selectedResource.address ? ` · ${selectedResource.address}` : ""}
              </p>
            </article>
          ) : null}

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
                <article
                  key={resource.id}
                  onClick={() => setSelectedId(resource.id)}
                  className={cn(
                    "cursor-pointer rounded-[1.5rem] border bg-white p-5 shadow-sm transition",
                    resource.id === selectedResource?.id ? "border-primary shadow-soft" : "border-border",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-primary">{resource.typeLabel}</p>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {resource.isRealData ? "公開資料" : "Demo"}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold">{resource.name}</h3>
                    </div>
                    {resource.district ? (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        {resource.district}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                    {resource.address ? <p>地址：{resource.address}</p> : null}
                    {resource.phone ? (
                      <p>
                        電話：{resource.phone}
                        {resource.extension ? ` #${resource.extension}` : ""}
                      </p>
                    ) : null}
                    {resource.openingHours ? <p>時間：{resource.openingHours}</p> : null}
                    <p>來源：{resource.sourceName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedId(resource.id);
                    }}
                    className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    查看資料
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
