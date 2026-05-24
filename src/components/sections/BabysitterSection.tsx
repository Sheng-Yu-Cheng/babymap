"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { BookingControls } from "@/components/booking/BookingControls";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BabysitterCard } from "@/components/cards/BabysitterCard";
import { Section } from "@/components/Section";
import { babysitters as localBabysitters, type Babysitter } from "@/data/babymap";
import { listBabysitters, subscribeToBabysitters } from "@/lib/data/babysitterBackend";
import type { Babysitter as BackendBabysitter } from "@/lib/supabase/types";

const BabysitterBookingMap = dynamic(
  () => import("@/components/map/BabysitterBookingMap").then((mod) => mod.BabysitterBookingMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center rounded-[1.75rem] border border-border bg-secondary text-sm text-secondary-foreground md:h-[560px]">
        載入保母地圖中...
      </div>
    ),
  },
);

function backendToBabysitter(row: BackendBabysitter): Babysitter {
  return {
    id: row.id,
    name: row.name,
    avatarInitials: row.name.slice(0, 1),
    rating: 4.8,
    reviewCount: 0,
    distanceKm: 1.5,
    pricePerHour: row.price_per_hour,
    availableTime: row.available_time,
    experienceYears: row.experience_years,
    certified: row.certified,
    verificationBadges: row.certified ? ["Demo 登記", "服務紀錄"] : ["課堂 demo", "待驗證"],
    serviceTags: row.service_tags,
    ageRange: row.age_range,
    intro: row.intro ?? "課堂 demo 保母資料。",
    location: {
      district: row.district,
      addressLabel: row.address_label,
      lat: row.lat,
      lng: row.lng,
    },
  };
}

export function BabysitterSection() {
  const [visibleBabysitters, setVisibleBabysitters] = useState<Babysitter[]>(localBabysitters);
  const [dataSource, setDataSource] = useState<"backend" | "local">("local");
  const [location, setLocation] = useState("台北市大安區");
  const [time, setTime] = useState("今天 14:00-18:00");
  const [serviceType, setServiceType] = useState("到府照顧");
  const [childAge, setChildAge] = useState("1-3 歲");
  const [selectedBabysitterId, setSelectedBabysitterId] = useState(localBabysitters[0].id);
  const selectedBabysitter =
    visibleBabysitters.find((babysitter) => babysitter.id === selectedBabysitterId) ?? visibleBabysitters[0];

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    async function loadBackendBabysitters() {
      try {
        const backendRows = await listBabysitters();
        if (!active || backendRows.length === 0) return;

        const mappedBabysitters = backendRows.map(backendToBabysitter);
        setVisibleBabysitters(mappedBabysitters);
        setDataSource("backend");
        setSelectedBabysitterId((current) =>
          mappedBabysitters.some((babysitter) => babysitter.id === current)
            ? current
            : mappedBabysitters[0].id,
        );

        const channel = subscribeToBabysitters((row) => {
          const mapped = backendToBabysitter(row);
          setVisibleBabysitters((current) => {
            const existingIndex = current.findIndex((babysitter) => babysitter.id === mapped.id);

            if (existingIndex === -1) return [mapped, ...current];

            const next = [...current];
            next[existingIndex] = mapped;
            return next;
          });
          setDataSource("backend");
        });

        unsubscribe = () => {
          channel.unsubscribe();
        };
      } catch {
        if (!active) return;
        setVisibleBabysitters(localBabysitters);
        setDataSource("local");
      }
    }

    loadBackendBabysitters();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  return (
    <Section
      id="babysitters"
      eyebrow="BabyCare Now"
      title="附近可預約保母，一眼看見位置與安全資訊"
      description="這是 mock booking demo：選擇地點、時間、服務與孩子年齡，再從地圖或卡片中挑選模擬保母。"
      className="bg-white/48"
    >
      <div className="mb-6 rounded-[1.5rem] border border-border bg-white p-4 text-sm leading-6 text-muted-foreground shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>保母資料為課堂 demo 模擬資料，非真實可預約人員。</p>
          <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {dataSource === "backend" ? "即時 demo 後端" : "本地模擬資料"}
          </span>
        </div>
        <p className="mt-2">
          正式上線時，保母媒合需包含政府登記資格、身分驗證、背景審查、服務紀錄、緊急聯絡、保險與平台客服。本頁目前使用模擬資料展示流程。
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        <div className="space-y-6">
          <BookingControls
            location={location}
            onLocationChange={setLocation}
            time={time}
            onTimeChange={setTime}
            serviceType={serviceType}
            onServiceTypeChange={setServiceType}
            childAge={childAge}
            onChildAgeChange={setChildAge}
          />

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">附近可預約保母</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  點選卡片或地圖標記即可更新預約摘要。
                </p>
              </div>
              <span className="text-sm font-medium text-primary">{visibleBabysitters.length} 位</span>
            </div>
            <div className="grid gap-4">
              {visibleBabysitters.map((babysitter) => (
                <BabysitterCard
                  key={babysitter.id}
                  babysitter={babysitter}
                  selected={babysitter.id === selectedBabysitterId}
                  onSelect={() => setSelectedBabysitterId(babysitter.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-white p-3 shadow-soft">
            <div className="mb-3 flex flex-col gap-2 px-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">OpenStreetMap · mock babysitter locations</p>
                <h3 className="mt-1 text-xl font-semibold">台北市附近保母地圖</h3>
              </div>
              <p className="text-sm text-muted-foreground">無真實定位追蹤，無地址 geocoding。</p>
            </div>
            <BabysitterBookingMap
              babysitters={visibleBabysitters}
              selectedId={selectedBabysitterId}
              onSelect={setSelectedBabysitterId}
            />
          </div>

          <BookingSummary
            serviceType={serviceType}
            location={location}
            time={time}
            childAge={childAge}
            babysitter={selectedBabysitter}
            dataSource={dataSource}
          />
        </div>
      </div>
    </Section>
  );
}
