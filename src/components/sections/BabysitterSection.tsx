"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { BookingControls } from "@/components/booking/BookingControls";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BabysitterCard } from "@/components/cards/BabysitterCard";
import { Section } from "@/components/Section";
import { babysitters } from "@/data/babymap";

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

export function BabysitterSection() {
  const [location, setLocation] = useState("台北市大安區");
  const [time, setTime] = useState("今天 14:00-18:00");
  const [serviceType, setServiceType] = useState("到府照顧");
  const [childAge, setChildAge] = useState("1-3 歲");
  const [selectedBabysitterId, setSelectedBabysitterId] = useState(babysitters[0].id);
  const selectedBabysitter =
    babysitters.find((babysitter) => babysitter.id === selectedBabysitterId) ?? babysitters[0];

  return (
    <Section
      id="babysitters"
      eyebrow="BabyCare Now"
      title="附近可預約保母，一眼看見位置與安全資訊"
      description="這是 mock booking demo：選擇地點、時間、服務與孩子年齡，再從地圖或卡片中挑選模擬保母。"
      className="bg-white/48"
    >
      <div className="mb-6 rounded-[1.5rem] border border-border bg-white p-4 text-sm leading-6 text-muted-foreground shadow-sm">
        <p>保母資料為課堂 demo 模擬資料，非真實可預約人員。</p>
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
              <span className="text-sm font-medium text-primary">{babysitters.length} 位</span>
            </div>
            <div className="grid gap-4">
              {babysitters.map((babysitter) => (
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
              babysitters={babysitters}
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
          />
        </div>
      </div>
    </Section>
  );
}
