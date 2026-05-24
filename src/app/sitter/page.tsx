"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { PageHero } from "@/components/PageHero";
import { createBabysitter } from "@/lib/data/babysitterBackend";
import { getTaipeiDistrictDemoCoordinate } from "@/lib/map/taipeiDistrictCoordinates";
import { cn } from "@/lib/utils";

const districts = ["大安區", "信義區", "松山區", "中正區", "中山區", "文山區", "內湖區", "士林區"];
const serviceTagOptions = ["到府照顧", "臨時托育", "接送服務", "產後短時支援", "0-1歲", "1-3歲", "3-6歲"];

function generateDemoCode() {
  const value = Math.floor(1000 + Math.random() * 9000);
  return `BM-${value}`;
}

export default function SitterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState(districts[0]);
  const [addressLabel, setAddressLabel] = useState("捷運站附近");
  const [pricePerHour, setPricePerHour] = useState(450);
  const [availableTime, setAvailableTime] = useState("今天 14:00-18:00");
  const [ageRange, setAgeRange] = useState("1-3 歲");
  const [experienceYears, setExperienceYears] = useState(1);
  const [intro, setIntro] = useState("");
  const [serviceTags, setServiceTags] = useState<string[]>(["到府照顧", "1-3歲"]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [demoCode, setDemoCode] = useState("");

  const dashboardHref = useMemo(
    () => (demoCode ? `/sitter/dashboard?code=${encodeURIComponent(demoCode)}` : "/sitter"),
    [demoCode],
  );

  function toggleServiceTag(tag: string) {
    setServiceTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const code = generateDemoCode();
      const coordinate = getTaipeiDistrictDemoCoordinate(`${name}-${phone}-${code}`, district);

      await createBabysitter({
        demo_code: code,
        name,
        phone: phone || undefined,
        district,
        address_label: addressLabel,
        lat: coordinate.lat,
        lng: coordinate.lng,
        price_per_hour: pricePerHour,
        available_time: availableTime,
        age_range: ageRange,
        experience_years: experienceYears,
        intro: intro || undefined,
        service_tags: serviceTags,
        certified: false,
        is_online: true,
      });

      setDemoCode(code);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "註冊失敗，請稍後再試。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Demo sitter registration"
        title="我是保姆"
        description="填寫一份 demo 資料後，你會出現在即時保姆地圖中。同學可以選擇你並送出模擬預約。"
      />

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="h-fit rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">課堂 demo 注意事項</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              本頁為課堂 demo，請勿填入真實敏感個資。保母資料可使用假資料。
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              此流程不包含真實身份驗證、背景審查、保險、付款或正式媒合。
            </p>
          </aside>

          {demoCode ? (
            <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold text-primary">註冊成功</p>
              <h2 className="mt-2 text-3xl font-bold">你的保姆代碼：{demoCode}</h2>
              <p className="mt-4 text-muted-foreground">請保留這個代碼，課堂 demo 中用它查看預約。</p>
              <Link
                href={dashboardHref}
                className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                前往保姆端
              </Link>
            </section>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="姓名" value={name} onChange={setName} required />
                <TextField label="電話（選填）" value={phone} onChange={setPhone} />
                <label className="text-sm font-medium">
                  行政區
                  <select
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
                  >
                    {districts.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <TextField label="位置描述" value={addressLabel} onChange={setAddressLabel} required />
                <NumberField label="每小時費用" value={pricePerHour} onChange={setPricePerHour} min={0} />
                <TextField label="可服務時間" value={availableTime} onChange={setAvailableTime} required />
                <TextField label="可照顧年齡" value={ageRange} onChange={setAgeRange} required />
                <NumberField label="經驗年數" value={experienceYears} onChange={setExperienceYears} min={0} />
              </div>

              <label className="mt-4 block text-sm font-medium">
                自我介紹
                <textarea
                  value={intro}
                  onChange={(event) => setIntro(event.target.value)}
                  className="mt-2 min-h-28 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
                  placeholder="可以寫假的 demo 介紹，例如：熟悉幼兒陪伴與接送。"
                />
              </label>

              <div className="mt-5">
                <p className="text-sm font-medium">服務標籤</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {serviceTagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleServiceTag(tag)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition",
                        serviceTags.includes(tag)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-white text-foreground hover:border-primary",
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage ? (
                <p className="mt-4 rounded-2xl bg-muted p-3 text-sm text-primary">{errorMessage}</p>
              ) : null}

              <button
                type="submit"
                disabled={submitting || !name || serviceTags.length === 0}
                className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "送出中..." : "送出 demo 保母資料"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <input
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <input
        type="number"
        min={min}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
      />
    </label>
  );
}
