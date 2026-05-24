"use client";

import "leaflet/dist/leaflet.css";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

import type { Babysitter } from "@/data/babymap";

type BabysitterBookingMapProps = {
  babysitters: Babysitter[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

const TAIPEI_CENTER = {
  lat: 25.033,
  lng: 121.5654,
};

export function BabysitterBookingMap({ babysitters, selectedId, onSelect }: BabysitterBookingMapProps) {
  return (
    <MapContainer
      center={[TAIPEI_CENTER.lat, TAIPEI_CENTER.lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[360px] w-full rounded-[1.75rem] md:h-[560px]"
    >
      <TileLayer
        attribution="OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {babysitters.map((babysitter) => {
        const selected = babysitter.id === selectedId;

        return (
          <CircleMarker
            key={babysitter.id}
            center={[babysitter.location.lat, babysitter.location.lng]}
            radius={selected ? 12 : 9}
            pathOptions={{
              color: selected ? "#2f2f2f" : "#ffffff",
              fillColor: selected ? "#f97356" : "#1f3d36",
              fillOpacity: 0.92,
              weight: selected ? 4 : 2,
            }}
            eventHandlers={{
              click: () => onSelect?.(babysitter.id),
            }}
          >
            <Popup>
              <div className="max-w-64 space-y-2 text-sm">
                <p className="font-semibold text-neutral-900">{babysitter.name}</p>
                <p>評分：{babysitter.rating} ({babysitter.reviewCount})</p>
                <p>距離：{babysitter.distanceKm.toFixed(1)} km</p>
                <p>費用：NT${babysitter.pricePerHour} / hr</p>
                <p>時段：{babysitter.availableTime}</p>
                <p>{babysitter.certified ? "已驗證保母" : "待驗證"}</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
