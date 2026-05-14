"use client";

import { CalendarClock, MapPin, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { BabysitterCard } from "@/components/cards/BabysitterCard";
import { Section } from "@/components/Section";
import { babysitters, bookingSafetyProtections, bookingServiceTypes } from "@/data/babymap";
import { cn } from "@/lib/utils";

export function BabysitterSection() {
  const [selectedService, setSelectedService] = useState(bookingServiceTypes[0]);
  const [selectedBabysitterId, setSelectedBabysitterId] = useState(babysitters[0].id);
  const selectedBabysitter =
    babysitters.find((babysitter) => babysitter.id === selectedBabysitterId) ?? babysitters[0];
  const estimatedCost = useMemo(() => selectedBabysitter.hourlyRate * 4, [selectedBabysitter]);

  return (
    <Section
      id="babysitters"
      eyebrow="BabyCare Now"
      title="像叫車一樣清楚，但服務是臨時照護支援"
      description="這是 mock booking demo：輸入地點與時間、選擇服務類型，再從附近合格保母中挑選一位。"
      className="bg-white/48"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium">
                地點
                <span className="mt-2 flex items-center gap-2 rounded-2xl border border-border px-4 py-3">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  <input className="min-w-0 flex-1 outline-none" defaultValue="台北市大安區" />
                </span>
              </label>
              <label className="text-sm font-medium">
                時間
                <span className="mt-2 flex items-center gap-2 rounded-2xl border border-border px-4 py-3">
                  <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
                  <input className="min-w-0 flex-1 outline-none" defaultValue="今天 14:00-18:00" />
                </span>
              </label>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium">服務類型</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {bookingServiceTypes.map((serviceType) => (
                  <button
                    key={serviceType}
                    type="button"
                    onClick={() => setSelectedService(serviceType)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition",
                      selectedService === serviceType
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white text-foreground hover:border-primary",
                    )}
                  >
                    {serviceType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
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

        <aside className="h-fit rounded-[1.75rem] border border-border bg-white p-5 shadow-soft lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-primary">預約摘要 Demo</p>
          <h3 className="mt-2 text-2xl font-bold">確認照護需求</h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">服務</dt>
              <dd className="font-medium text-foreground">{selectedService}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">保母</dt>
              <dd className="text-right font-medium text-foreground">
                {selectedBabysitter.name}
                <span className="block text-xs text-muted-foreground">{selectedBabysitter.distance}</span>
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">時段</dt>
              <dd className="text-right font-medium text-foreground">今天 14:00-18:00</dd>
            </div>
            <div className="rounded-2xl bg-muted p-4">
              <dt className="text-muted-foreground">預估費用</dt>
              <dd className="mt-1 text-3xl font-bold text-foreground">
                NT${estimatedCost.toLocaleString()}
              </dd>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                以 4 小時計算，實際費用依服務內容與平台規則為準。
              </p>
            </div>
          </dl>

          <div className="mt-5">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-secondary-foreground" aria-hidden="true" />
              安全保障
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {bookingSafetyProtections.map((protection) => (
                <span key={protection} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {protection}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            確認預約 Demo
          </button>
          <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
            此頁僅為前端 mock data 展示，沒有送出真實預約。
          </p>
        </aside>
      </div>
    </Section>
  );
}
