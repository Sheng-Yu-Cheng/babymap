"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { Section } from "@/components/Section";
import type { ChildcareResource, TaipeiResourceSourceStatusMap } from "@/lib/data/taipeiResources";
import { getDemoCoordinate } from "@/lib/map/demoCoordinates";
import { cn } from "@/lib/utils";

const MAX_MAP_MARKERS = 80;
const PAGE_SIZE = 20;
const resourceTypes = ["全部", "托嬰中心", "親子館", "哺集乳室"];
const districtOptions = [
  "全部行政區",
  "中正區",
  "大同區",
  "中山區",
  "松山區",
  "大安區",
  "萬華區",
  "信義區",
  "士林區",
  "北投區",
  "內湖區",
  "南港區",
  "文山區",
];

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
  sourceStatus?: TaipeiResourceSourceStatusMap;
};

const sourceSummaryItems = [
  { key: "publicNursery", label: "托嬰中心" },
  { key: "parentChildCenters", label: "親子館" },
  { key: "breastfeedingRooms", label: "哺集乳室" },
] as const;

function searchText(resource: ChildcareResource) {
  return [
    resource.name,
    resource.typeLabel,
    resource.address,
    resource.district,
    resource.notes,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getMapResources(resources: ChildcareResource[], resourceType: string) {
  if (resourceType !== "全部") {
    return resources.slice(0, MAX_MAP_MARKERS);
  }

  const nursery = resources.filter((resource) => resource.typeLabel === "托嬰中心").slice(0, 30);
  const parentChildCenters = resources.filter((resource) => resource.typeLabel === "親子館").slice(0, 25);
  const breastfeedingRooms = resources.filter((resource) => resource.typeLabel === "哺集乳室").slice(0, 25);
  const balancedResources = [...nursery, ...parentChildCenters, ...breastfeedingRooms];

  if (balancedResources.length >= MAX_MAP_MARKERS) {
    return balancedResources.slice(0, MAX_MAP_MARKERS);
  }

  const seenIds = new Set(balancedResources.map((resource) => resource.id));
  const fillResources = resources
    .filter((resource) => !seenIds.has(resource.id))
    .slice(0, MAX_MAP_MARKERS - balancedResources.length);

  return [...balancedResources, ...fillResources];
}

export function ResourceMapSection({
  resources,
  usingFallback = false,
  sourceStatus,
}: ResourceMapSectionProps) {
  const [region, setRegion] = useState("全部行政區");
  const [resourceType, setResourceType] = useState("全部");
  const [keyword, setKeyword] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [reservableOnly, setReservableOnly] = useState(false);
  const [realDataOnly, setRealDataOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(resources[0]?.id);
  const [detailResource, setDetailResource] = useState<ChildcareResource | null>(null);
  const [page, setPage] = useState(1);

  const filteredResources = useMemo(
    () =>
      resources.filter((resource) => {
        const normalizedKeyword = keyword.trim().toLowerCase();

        if (region !== "全部行政區" && resource.district !== region) return false;
        if (resourceType !== "全部" && resource.typeLabel !== resourceType) return false;
        if (normalizedKeyword && !searchText(resource).includes(normalizedKeyword)) return false;
        if (openOnly && !resource.openingHours) return false;
        if (reservableOnly && resource.typeLabel !== "托嬰中心" && resource.typeLabel !== "親子館") return false;
        if (realDataOnly && !resource.isRealData) return false;
        return true;
      }),
    [keyword, openOnly, realDataOnly, region, reservableOnly, resourceType, resources],
  );
  const mapResources = useMemo(
    () => getMapResources(filteredResources, resourceType),
    [filteredResources, resourceType],
  );
  const totalPages = Math.max(1, Math.ceil(filteredResources.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedResources = filteredResources.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const selectedResource =
    filteredResources.find((resource) => resource.id === selectedId) ?? filteredResources[0];
  const isFiltered =
    region !== "全部行政區" ||
    resourceType !== "全部" ||
    keyword.trim().length > 0 ||
    openOnly ||
    reservableOnly ||
    realDataOnly;
  const resultSummary = isFiltered
    ? `符合條件 ${filteredResources.length} 筆，地圖顯示 ${mapResources.length} 筆`
    : `共 ${resources.length} 筆，地圖顯示前 ${mapResources.length} 筆`;
  const showBreastfeedingHint = resourceType === "哺集乳室" && filteredResources.length > MAX_MAP_MARKERS;

  function resetToFirstPage() {
    setPage(1);
  }

  async function copyAddress(address?: string) {
    if (!address) return;
    await navigator.clipboard?.writeText(address);
  }

  function openDetails(resource: ChildcareResource) {
    setSelectedId(resource.id);
    setDetailResource(resource);
  }

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
        {sourceStatus ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {sourceSummaryItems.map((item) => {
              const status = sourceStatus[item.key];

              return (
                <span
                  key={item.key}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    status.ok ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {status.ok ? `${item.label} ${status.normalizedRows} 筆` : `${item.label}：該資料來源暫時無法讀取`}
                </span>
              );
            })}
          </div>
        ) : null}
        <p className="mt-2">
          地圖點位為 demo 視覺化定位；資源名稱、地址與聯絡資訊來自公開資料或備用資料。
        </p>
        <p className="mt-2">
          由於公開資料多數僅提供地址，正式版本可透過離線地理編碼產生精準座標。
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
                onChange={(event) => {
                  setRegion(event.target.value);
                  resetToFirstPage();
                }}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
              >
                {districtOptions.map((district) => (
                  <option key={district}>{district}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium">
              關鍵字搜尋
              <input
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value);
                  resetToFirstPage();
                }}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
                placeholder="搜尋名稱、地址、備註..."
              />
            </label>

            <div>
              <p className="text-sm font-medium">資源類型</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {resourceTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setResourceType(type);
                      resetToFirstPage();
                    }}
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
              <FilterToggle
                active={openOnly}
                onClick={() => {
                  setOpenOnly((value) => !value);
                  resetToFirstPage();
                }}
              >
                是否開放中
              </FilterToggle>
              <FilterToggle
                active={reservableOnly}
                onClick={() => {
                  setReservableOnly((value) => !value);
                  resetToFirstPage();
                }}
              >
                是否可預約
              </FilterToggle>
              <FilterToggle
                active={realDataOnly}
                onClick={() => {
                  setRealDataOnly((value) => !value);
                  resetToFirstPage();
                }}
              >
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
                <h3 className="mt-1 text-xl font-semibold">{resultSummary}</h3>
              </div>
              <p className="text-sm text-muted-foreground">未使用地址即時 geocoding。</p>
            </div>
            {showBreastfeedingHint ? (
              <p className="mb-3 rounded-2xl bg-muted px-4 py-3 text-sm leading-6 text-muted-foreground">
                哺集乳室資料量較大，建議使用行政區或關鍵字縮小範圍。
              </p>
            ) : null}
            <ResourceLeafletMap
              resources={mapResources}
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
              {paginatedResources.map((resource) => (
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
                      openDetails(resource);
                    }}
                    className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    查看詳情
                  </button>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 rounded-[1.5rem] border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
              >
                上一頁
              </button>
              <span className="text-center text-sm text-muted-foreground">
                第 {currentPage} / {totalPages} 頁
              </span>
              <button
                type="button"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
              >
                下一頁
              </button>
            </div>
          </div>
        </div>
      </div>

      {detailResource ? (
        <ResourceDetailModal
          resource={detailResource}
          onClose={() => setDetailResource(null)}
          onCopyAddress={copyAddress}
          onSelect={() => {
            setSelectedId(detailResource.id);
            setDetailResource(null);
          }}
        />
      ) : null}
    </Section>
  );
}

function ResourceDetailModal({
  resource,
  onClose,
  onCopyAddress,
  onSelect,
}: {
  resource: ChildcareResource;
  onClose: () => void;
  onCopyAddress: (address?: string) => void;
  onSelect: () => void;
}) {
  const coordinate = getDemoCoordinate(resource, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-foreground/35 p-4 sm:items-center sm:justify-center">
      <article className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                {resource.typeLabel}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                {resource.isRealData ? "公開資料" : "Demo"}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-bold">{resource.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1 text-sm font-medium"
          >
            關閉
          </button>
        </div>

        <dl className="mt-6 grid gap-4 text-sm leading-6">
          <DetailRow label="地址" value={resource.address} />
          <DetailRow
            label="電話"
            value={resource.phone ? `${resource.phone}${resource.extension ? ` #${resource.extension}` : ""}` : undefined}
          />
          <DetailRow label="開放時間" value={resource.openingHours} />
          <DetailRow label="資料來源" value={resource.sourceName} />
          <DetailRow
            label="地圖定位"
            value={coordinate.isDemoCoordinate ? "demo 視覺化定位" : "資料含座標"}
          />
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onCopyAddress(resource.address)}
            disabled={!resource.address}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            複製地址
          </button>
          {resource.phone ? (
            <a
              href={`tel:${resource.phone}`}
              className="rounded-full border border-border px-5 py-3 text-center text-sm font-semibold text-foreground"
            >
              撥打電話
            </a>
          ) : null}
          <button
            type="button"
            onClick={onSelect}
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground"
          >
            在地圖上選取
          </button>
        </div>
      </article>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl bg-muted p-4">
      <dt className="font-medium text-foreground">{label}</dt>
      <dd className="mt-1 text-muted-foreground">{value || "未提供"}</dd>
    </div>
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
