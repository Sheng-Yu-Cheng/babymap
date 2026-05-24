export const taipeiDistrictCoordinates: Record<string, { lat: number; lng: number }> = {
  大安區: { lat: 25.0262, lng: 121.5435 },
  信義區: { lat: 25.033, lng: 121.5654 },
  松山區: { lat: 25.0497, lng: 121.577 },
  中正區: { lat: 25.0324, lng: 121.5198 },
  中山區: { lat: 25.0644, lng: 121.5337 },
  文山區: { lat: 24.997, lng: 121.57 },
  內湖區: { lat: 25.083, lng: 121.5868 },
  士林區: { lat: 25.088, lng: 121.5246 },
};

function hashText(text: string) {
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function getTaipeiDistrictDemoCoordinate(seed: string, district: string) {
  const base = taipeiDistrictCoordinates[district] ?? taipeiDistrictCoordinates["大安區"];
  const hash = hashText(`${district}-${seed}`);
  const angle = ((hash % 360) * Math.PI) / 180;
  const radius = 0.0015 + ((hash % 11) / 11) * 0.006;

  return {
    lat: base.lat + Math.sin(angle) * radius,
    lng: base.lng + Math.cos(angle) * radius,
  };
}
