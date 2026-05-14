import Papa from "papaparse";

import { childcareResources as babyMapFallbackResources } from "@/data/babymap";

const PUBLIC_NURSERY_URL =
  "https://data.taipei/api/frontstage/tpeod/dataset/resource.download?rid=a02ccc34-dd28-4c5d-b527-c5433ec1a453";
const PARENT_CHILD_CENTER_URL =
  "https://data.taipei/api/frontstage/tpeod/dataset/resource.download?rid=5c09f39f-79cc-45b8-be8e-9b3ea8b220e3";
const BREASTFEEDING_ROOM_URL =
  "https://data.taipei/api/frontstage/tpeod/dataset/resource.download?rid=4350117f-8697-4903-8a49-a7a59f30eeb1";

export type ChildcareResource = {
  id: string;
  name: string;
  type: "public_nursery" | "parent_child_center" | "breastfeeding_room" | "demo";
  typeLabel: "托嬰中心" | "親子館" | "哺集乳室" | "Demo";
  districtCode?: string;
  district?: string;
  address?: string;
  phone?: string;
  extension?: string;
  capacity?: string;
  openingHours?: string;
  notes?: string;
  sourceName: string;
  sourceUrl: string;
  isRealData: boolean;
  lat?: number;
  lng?: number;
};

export type TaipeiResourceSourceStatus = {
  ok: boolean;
  rawRows: number;
  normalizedRows: number;
};

export type TaipeiResourceSourceStatusMap = {
  publicNursery: TaipeiResourceSourceStatus;
  parentChildCenters: TaipeiResourceSourceStatus;
  breastfeedingRooms: TaipeiResourceSourceStatus;
};

type RawCsvRow = Record<string, string | undefined>;

type TaipeiSource = {
  key: keyof TaipeiResourceSourceStatusMap;
  sourceName: string;
  sourceUrl: string;
  type: ChildcareResource["type"];
  typeLabel: ChildcareResource["typeLabel"];
};

const knownHeaderNames = new Set([
  "機關名稱",
  "機構名稱",
  "場所名稱",
  "名稱",
  "地址",
  "電話",
  "分機",
  "行政區",
  "開放時間",
  "位置指引",
  "基本設備",
  "友善設備或服務",
  "貼心小提醒",
]);

const taipeiSources: TaipeiSource[] = [
  {
    key: "publicNursery",
    sourceName: "臺北市公私立托嬰中心",
    sourceUrl: PUBLIC_NURSERY_URL,
    type: "public_nursery",
    typeLabel: "托嬰中心",
  },
  {
    key: "parentChildCenters",
    sourceName: "臺北市親子館",
    sourceUrl: PARENT_CHILD_CENTER_URL,
    type: "parent_child_center",
    typeLabel: "親子館",
  },
  {
    key: "breastfeedingRooms",
    sourceName: "臺北市哺集乳室",
    sourceUrl: BREASTFEEDING_ROOM_URL,
    type: "breastfeeding_room",
    typeLabel: "哺集乳室",
  },
];

function cleanCsvText(csvText: string) {
  return csvText.replace(/^\uFEFF/, "");
}

function cleanHeader(header: string) {
  return header.replace(/^\uFEFF/, "").trim();
}

function cleanValue(value: unknown) {
  return typeof value === "string" ? value.replace(/^\uFEFF/, "").trim() : value;
}

function cleanRow(row: RawCsvRow): RawCsvRow {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [cleanHeader(key), typeof value === "string" ? value.trim() : value]),
  );
}

function pick(row: RawCsvRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key]?.trim();

    if (value) return value;
  }

  return undefined;
}

function collect(row: RawCsvRow, keys: string[]) {
  return keys.map((key) => pick(row, [key])).filter((value): value is string => Boolean(value));
}

function parseNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeRow(row: RawCsvRow, source: TaipeiSource, index: number): ChildcareResource | null {
  const cleanedRow = cleanRow(row);
  const name = pick(cleanedRow, [
    "機關名稱",
    "機構名稱",
    "場所名稱",
    "名稱",
    "場館名稱",
    "單位名稱",
    "Name",
    "name",
  ]);
  if (!name) return null;

  const notes = collect(cleanedRow, [
    "位置指引",
    "基本設備",
    "友善設備或服務",
    "貼心小提醒",
    "備註",
    "說明",
    "服務內容",
    "notes",
  ]).join("；");
  const district = pick(cleanedRow, ["行政區", "區別", "區", "district"]);
  const address = pick(cleanedRow, ["地址", "機構地址", "場館地址", "地點", "address"]);
  const phone = pick(cleanedRow, ["電話", "連絡電話", "聯絡電話", "洽詢電話", "phone"]);
  const extension = pick(cleanedRow, ["分機", "extension"]);
  const capacity = pick(cleanedRow, ["核定收托人數", "收托人數", "容留人數", "capacity"]);
  const openingHours = pick(cleanedRow, ["開放時間", "服務時間", "營業時間", "openingHours"]);
  const lat = parseNumber(pick(cleanedRow, ["緯度", "lat", "latitude", "Latitude"]));
  const lng = parseNumber(pick(cleanedRow, ["經度", "lng", "longitude", "Longitude"]));

  return {
    id: `${source.type}-${index}-${name}`,
    name,
    type: source.type,
    typeLabel: source.typeLabel,
    districtCode: pick(cleanedRow, ["行政區代碼", "區碼", "districtCode"]),
    district,
    address,
    phone,
    extension,
    capacity,
    openingHours,
    notes: notes || undefined,
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl,
    isRealData: true,
    lat,
    lng,
  };
}

function parseCsvText(csvText: string) {
  return Papa.parse<RawCsvRow>(cleanCsvText(csvText), {
    header: true,
    skipEmptyLines: true,
    transformHeader: cleanHeader,
    transform: cleanValue,
  });
}

function scoreHeaders(row: RawCsvRow | undefined) {
  if (!row) return 0;

  return Object.keys(row).filter((header) => knownHeaderNames.has(cleanHeader(header))).length;
}

function parseCsvBuffer(buffer: ArrayBuffer, source: TaipeiSource) {
  const candidates = ["utf-8", "big5"].map((encoding) => {
    const csvText = new TextDecoder(encoding).decode(buffer);
    const parsed = parseCsvText(csvText);
    const resources = parsed.data
      .map((row, index) => normalizeRow(row, source, index))
      .filter((resource): resource is ChildcareResource => Boolean(resource));

    return {
      parsed,
      resources,
      score: scoreHeaders(parsed.data[0]) + resources.length * 10,
    };
  });

  return candidates.sort((a, b) => b.score - a.score)[0];
}

async function fetchCsvSource(source: TaipeiSource): Promise<{
  source: TaipeiSource;
  ok: boolean;
  rawRows: number;
  resources: ChildcareResource[];
}> {
  const response = await fetch(source.sourceUrl, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${source.sourceName}: ${response.status}`);
  }

  const csvBuffer = await response.arrayBuffer();
  const { parsed, resources } = parseCsvBuffer(csvBuffer, source);

  if (parsed.errors.length > 0 && parsed.data.length === 0) {
    throw new Error(`Failed to parse ${source.sourceName}`);
  }

  return {
    source,
    ok: true,
    rawRows: parsed.data.length,
    resources,
  };
}

function getFallbackResources(): ChildcareResource[] {
  return babyMapFallbackResources.map((resource) => ({
    id: resource.id,
    name: resource.name,
    type: "demo",
    typeLabel: "Demo",
    district: resource.region,
    address: resource.tags.join("、"),
    phone: undefined,
    openingHours: resource.status,
    notes: resource.action,
    sourceName: "BabyMap demo 資料",
    sourceUrl: "",
    isRealData: false,
  }));
}

export async function getTaipeiChildcareResources(): Promise<{
  resources: ChildcareResource[];
  usingFallback: boolean;
  sourceStatus: TaipeiResourceSourceStatusMap;
}> {
  const sourceStatus: TaipeiResourceSourceStatusMap = {
    publicNursery: { ok: false, rawRows: 0, normalizedRows: 0 },
    parentChildCenters: { ok: false, rawRows: 0, normalizedRows: 0 },
    breastfeedingRooms: { ok: false, rawRows: 0, normalizedRows: 0 },
  };

  // Future open-data expansion point:
  // Add stricter schema validation and per-source field mappings here as Taipei datasets evolve.
  // Each source is isolated so one broken CSV cannot hide the other working datasets.
  const settledSources = await Promise.allSettled(taipeiSources.map((source) => fetchCsvSource(source)));
  const resources = settledSources.flatMap((result) => {
    if (result.status === "rejected") return [];

    sourceStatus[result.value.source.key] = {
      ok: result.value.ok,
      rawRows: result.value.rawRows,
      normalizedRows: result.value.resources.length,
    };

    return result.value.resources;
  });

  if (resources.length === 0) {
    return {
      resources: getFallbackResources(),
      usingFallback: true,
      sourceStatus,
    };
  }

  return {
    resources,
    usingFallback: false,
    sourceStatus,
  };
}
