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
  type: "nursery" | "parent-child-center" | "breastfeeding-room" | "demo";
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

type RawCsvRow = Record<string, string | undefined>;

type TaipeiSource = {
  sourceName: string;
  sourceUrl: string;
  type: ChildcareResource["type"];
  typeLabel: ChildcareResource["typeLabel"];
};

const taipeiSources: TaipeiSource[] = [
  {
    sourceName: "臺北市公私立托嬰中心",
    sourceUrl: PUBLIC_NURSERY_URL,
    type: "nursery",
    typeLabel: "托嬰中心",
  },
  {
    sourceName: "臺北市親子館",
    sourceUrl: PARENT_CHILD_CENTER_URL,
    type: "parent-child-center",
    typeLabel: "親子館",
  },
  {
    sourceName: "臺北市哺集乳室",
    sourceUrl: BREASTFEEDING_ROOM_URL,
    type: "breastfeeding-room",
    typeLabel: "哺集乳室",
  },
];

function pick(row: RawCsvRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key]?.trim();

    if (value) return value;
  }

  return undefined;
}

function parseNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeRow(row: RawCsvRow, source: TaipeiSource, index: number): ChildcareResource | null {
  const name = pick(row, ["名稱", "機構名稱", "場館名稱", "單位名稱", "Name", "name"]);
  if (!name) return null;

  const district = pick(row, ["行政區", "區別", "區", "district"]);
  const address = pick(row, ["地址", "機構地址", "場館地址", "地點", "address"]);
  const phone = pick(row, ["電話", "連絡電話", "聯絡電話", "洽詢電話", "phone"]);
  const extension = pick(row, ["分機", "extension"]);
  const capacity = pick(row, ["核定收托人數", "收托人數", "容留人數", "capacity"]);
  const openingHours = pick(row, ["開放時間", "服務時間", "營業時間", "openingHours"]);
  const notes = pick(row, ["備註", "說明", "服務內容", "notes"]);
  const lat = parseNumber(pick(row, ["緯度", "lat", "latitude", "Latitude"]));
  const lng = parseNumber(pick(row, ["經度", "lng", "longitude", "Longitude"]));

  return {
    id: `${source.type}-${index}-${name}`,
    name,
    type: source.type,
    typeLabel: source.typeLabel,
    districtCode: pick(row, ["行政區代碼", "區碼", "districtCode"]),
    district,
    address,
    phone,
    extension,
    capacity,
    openingHours,
    notes,
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl,
    isRealData: true,
    lat,
    lng,
  };
}

async function fetchCsvSource(source: TaipeiSource) {
  const response = await fetch(source.sourceUrl, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${source.sourceName}: ${response.status}`);
  }

  const csvText = await response.text();
  const parsed = Papa.parse<RawCsvRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(`Failed to parse ${source.sourceName}`);
  }

  return parsed.data
    .map((row, index) => normalizeRow(row, source, index))
    .filter((resource): resource is ChildcareResource => Boolean(resource));
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
}> {
  try {
    // Future open-data expansion point:
    // Add schema validation and per-source field mappings here as Taipei datasets evolve.
    // If any upstream fetch or CSV parse fails, the class demo keeps working via fallback data.
    const resourcesBySource = await Promise.all(taipeiSources.map((source) => fetchCsvSource(source)));
    const resources = resourcesBySource.flat();

    if (resources.length === 0) {
      return {
        resources: getFallbackResources(),
        usingFallback: true,
      };
    }

    return {
      resources,
      usingFallback: false,
    };
  } catch {
    return {
      resources: getFallbackResources(),
      usingFallback: true,
    };
  }
}
