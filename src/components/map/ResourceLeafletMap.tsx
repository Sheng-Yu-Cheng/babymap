"use client";

import "leaflet/dist/leaflet.css";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

import type { ChildcareResource } from "@/lib/data/taipeiResources";
import { getDemoCoordinate, TAIPEI_CENTER } from "@/lib/map/demoCoordinates";

type ResourceLeafletMapProps = {
  resources: ChildcareResource[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

const markerColors: Record<string, { fill: string; stroke: string }> = {
  托嬰中心: { fill: "#f97356", stroke: "#ffffff" },
  親子館: { fill: "#bfe6ff", stroke: "#183547" },
  哺集乳室: { fill: "#dff5ee", stroke: "#1f3d36" },
  Demo: { fill: "#2f2f2f", stroke: "#ffffff" },
};

function getMarkerColors(typeLabel: string) {
  return markerColors[typeLabel] ?? markerColors.Demo;
}

export function ResourceLeafletMap({ resources, selectedId, onSelect }: ResourceLeafletMapProps) {
  return (
    <MapContainer
      center={[TAIPEI_CENTER.lat, TAIPEI_CENTER.lng]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-[360px] w-full rounded-[1.75rem] md:h-[520px]"
    >
      <TileLayer
        attribution="OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {resources.map((resource, index) => {
        const coordinate = getDemoCoordinate(resource, index);
        const colors = getMarkerColors(resource.typeLabel);
        const selected = resource.id === selectedId;

        return (
          <CircleMarker
            key={resource.id}
            center={[coordinate.lat, coordinate.lng]}
            radius={selected ? 11 : 8}
            pathOptions={{
              color: selected ? "#2f2f2f" : colors.stroke,
              fillColor: colors.fill,
              fillOpacity: 0.9,
              weight: selected ? 4 : 2,
            }}
            eventHandlers={{
              click: () => onSelect?.(resource.id),
            }}
          >
            <Popup>
              <div className="max-w-64 space-y-2 text-sm">
                <div>
                  <p className="font-semibold text-neutral-900">{resource.name}</p>
                  <p className="text-neutral-600">{resource.typeLabel}</p>
                </div>
                {resource.address ? <p>地址：{resource.address}</p> : null}
                {resource.phone ? (
                  <p>
                    電話：{resource.phone}
                    {resource.extension ? ` #${resource.extension}` : ""}
                  </p>
                ) : null}
                {resource.openingHours ? <p>時間：{resource.openingHours}</p> : null}
                <p>來源：{resource.sourceName}</p>
                <p className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                  {coordinate.isDemoCoordinate ? "demo 視覺化定位" : "資料含座標"}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
