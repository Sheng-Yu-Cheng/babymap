import type { ChildcareResource } from "@/lib/data/taipeiResources";

export const TAIPEI_CENTER = {
  lat: 25.033,
  lng: 121.5654,
};

const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  中正區: { lat: 25.0324, lng: 121.5198 },
  大同區: { lat: 25.0634, lng: 121.513 },
  中山區: { lat: 25.0644, lng: 121.5337 },
  松山區: { lat: 25.0497, lng: 121.577 },
  大安區: { lat: 25.0262, lng: 121.5435 },
  萬華區: { lat: 25.0353, lng: 121.4999 },
  信義區: { lat: 25.033, lng: 121.5654 },
  士林區: { lat: 25.088, lng: 121.5246 },
  北投區: { lat: 25.1324, lng: 121.5014 },
  內湖區: { lat: 25.083, lng: 121.5868 },
  南港區: { lat: 25.0542, lng: 121.607 },
  文山區: { lat: 24.997, lng: 121.57 },
};

function inferDistrict(resource: ChildcareResource) {
  if (resource.district && districtCoordinates[resource.district]) {
    return resource.district;
  }

  return Object.keys(districtCoordinates).find((district) => resource.address?.includes(district));
}

export function getDemoCoordinate(resource: ChildcareResource, index: number) {
  if (typeof resource.lat === "number" && typeof resource.lng === "number") {
    return {
      lat: resource.lat,
      lng: resource.lng,
      isDemoCoordinate: false,
    };
  }

  const district = inferDistrict(resource);
  const base = district ? districtCoordinates[district] : TAIPEI_CENTER;
  const ring = (index % 8) + 1;
  const direction = index % 2 === 0 ? 1 : -1;
  const latOffset = direction * ring * 0.0018;
  const lngOffset = -direction * ((index % 5) + 1) * 0.0016;

  return {
    lat: base.lat + latOffset,
    lng: base.lng + lngOffset,
    isDemoCoordinate: true,
  };
}
