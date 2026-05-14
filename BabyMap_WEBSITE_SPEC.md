# BabyMap：網站規格與技術細節

## 1. 文件目的

本文件描述 BabyMap 網站 demo 的產品規格、頁面結構、技術選型、UI/UX 原則、資料模型與前端實作方向。

此文件可直接作為 Codex / AI coding agent 的開發依據。

---

## 2. 技術選型

### 2.1 推薦技術棧

使用：

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react icons
- Framer Motion
- Magic UI style animated sections
- 少量 Aceternity UI 風格特效
- Optional：Recharts 或 Tremor，用於簡單圖表與資料卡片

### 2.2 為什麼選 Next.js

BabyMap 不是純靜態網站，而是具有產品 demo 感的互動平台。它需要：

- 多個功能區塊
- 表單互動
- 卡片列表
- 篩選器
- 預約流程
- 補助試算
- FAQ / AI 問答樣式
- Dashboard-like data cards
- 手機與桌面響應式設計

Next.js + React 生態適合搭配 shadcn/ui、Magic UI、Aceternity UI 與 Recharts，能快速做出「可用」又「有展示效果」的網站。

### 2.3 本階段限制

本專案目前只需要前端 demo。

請不要實作：

- 真實後端
- 真實登入系統
- 真實付款
- 真實地圖 API
- 真實 AI API
- 真實保姆預約送出
- 真實政府資料串接

請使用 mock data 完成展示。

---

## 3. 專案目標

建立一個 polished single-page demo，展示 BabyMap 如何透過數位工具降低生育焦慮。

網站要看起來像一個真的可以被使用的育兒支持平台，而不是單純簡報頁面。

---

## 4. 建議網站型態

### 4.1 第一階段：Single-page Landing + Demo Sections

建議先做單頁式網站。

頁面區塊：

1. Hero Section
2. Problem / Theory Section
3. Feature Overview Bento Grid
4. BabyCare Now 即時保姆預約 Demo
5. Subsidy + Budget Planner 補助與預算試算 Demo
6. Childcare Resource Map 托育資源地圖 Demo
7. Timeline Roadmap 生育時間軸 Demo
8. Anxiety Breaker 社群焦慮破解 Demo
9. Real Parenting Stories 真實案例牆
10. Dad Mode 父職專區
11. Safety / Trust Section
12. Final CTA

### 4.2 第二階段：Multi-page App

如果之後要擴展，可拆成：

```text
/
/decision-map
/subsidies
/map
/babysitter
/budget
/timeline
/anxiety
/stories
/partner-planner
/sos
/dad-mode
/community
```

本次 demo 建議先以單頁式完成。

---

## 5. UI / UX 設計原則

### 5.1 視覺風格

關鍵字：

```text
溫暖、乾淨、可信任、有科技感但不冰冷、像新創產品但不浮誇
```

避免：

- 太像政府網站
- 太像傳統親子網站
- 太幼稚
- 太商業廣告感
- 過度粉紅
- 過度發光或過度動畫

建議：

- 米白 / 暖白背景
- 深灰文字
- 柔和橘色或珊瑚色作 CTA
- 淺藍或薄荷綠作輔助色
- 少量柔和漸層
- 大量留白
- 卡片式排版
- 圓角、陰影、清楚層級

### 5.2 語氣

平台語氣應該像一個冷靜、可信任、溫和的朋友。

避免：

```text
你一定要生！
生小孩超幸福！
不生會後悔！
```

建議：

```text
你可以先理解有哪些資源。
你不需要一個人面對育兒。
我們幫你把資訊整理成可以規劃的步驟。
```

### 5.3 RWD

必須支援：

- Desktop 1440px
- Laptop 1024px
- Tablet 768px
- Mobile 375px

手機版需優先保持：

- CTA 清楚
- 表單不擁擠
- 卡片可垂直堆疊
- 底部或浮動 SOS 按鈕可見

---

## 6. 全站資訊架構

### 6.1 Header

包含：

- Logo：BabyMap
- Nav items：
  - 理念
  - 功能
  - 即時保姆
  - 補助試算
  - 焦慮破解
  - 父職專區
- CTA Button：開始規劃

Mobile 使用 hamburger menu 或簡化 nav。

### 6.2 Hero Section

目的：快速說清楚 BabyMap 是什麼。

文案：

```text
想生，但不知道怎麼開始？

BabyMap 幫你整理補助、托育、臨時照護、育兒規劃與真實案例，
讓生育不再只是焦慮，而是可以被規劃的選擇。
```

CTA：

- 開始規劃
- 查看即時保姆 Demo

視覺建議：

- 左側文案
- 右側產品 UI preview card
- 使用 soft gradient background
- 可使用 Magic UI style animated background，但不要過度

### 6.3 Problem / Theory Section

呈現：

- 生育焦慮不是單一問題
- 資訊、照護、經濟、社群敘事共同造成不確定感
- BabyMap 將 digital anxiety 轉化為 digital support

可使用 3 欄卡片：

1. 資訊分散
2. 照護不安
3. 社群焦慮

### 6.4 Feature Overview Bento Grid

功能卡片：

- 補助查詢
- 托育地圖
- 即時保姆
- 預算試算
- 焦慮破解
- 生育時間軸
- 真實案例
- 父職專區

每張卡片包含：

- icon
- title
- short description
- tag

---

## 7. 核心 Demo 區塊規格

## 7.1 BabyCare Now：即時保姆預約 Demo

### 7.1.1 目的

展示 BabyMap 如何把原本依賴親友的育兒支援，轉化成可以即時媒合的社會資源。

### 7.1.2 UI 元件

包含：

- 地點輸入欄
- 日期 / 時間選擇
- 照護需求選擇
- 保母列表卡片
- 認證 badge
- 評分
- 距離
- 價格
- 可預約時段
- 預約按鈕
- 安全機制提示

### 7.1.3 Mock Flow

```text
Step 1：輸入需求
地點：台北市大安區
時間：今天 14:00-18:00
需求：臨時保母，到府照顧

Step 2：系統推薦保母
陳小姐｜合格保母｜距離 1.2km｜4.9★｜可立即預約
林小姐｜到府保母｜距離 2.0km｜4.8★｜最快 30 分鐘後可到

Step 3：查看保母資訊
資格認證、服務年資、評價、收費、可服務年齡

Step 4：確認預約
平台建立服務紀錄，提供聯絡方式與緊急聯絡機制
```

### 7.1.4 Mock Data

```ts
export const babysitters = [
  {
    id: "b1",
    name: "陳小姐",
    distance: "1.2 km",
    rating: 4.9,
    certified: true,
    availableTime: "今天 14:00-18:00",
    price: "NT$450 / hr",
    experience: "6 年經驗",
    tags: ["到府照顧", "0-3歲", "政府登記"],
    safety: ["身分驗證", "服務紀錄", "緊急聯絡"]
  },
  {
    id: "b2",
    name: "林小姐",
    distance: "2.0 km",
    rating: 4.8,
    certified: true,
    availableTime: "最快 30 分鐘後",
    price: "NT$420 / hr",
    experience: "5 年經驗",
    tags: ["臨時托育", "接送服務", "5年經驗"],
    safety: ["背景審查", "家長評價", "平台保障"]
  },
  {
    id: "b3",
    name: "王小姐",
    distance: "2.8 km",
    rating: 4.7,
    certified: true,
    availableTime: "今天 18:00-21:00",
    price: "NT$390 / hr",
    experience: "3 年經驗",
    tags: ["晚間支援", "幼兒照顧", "可短時段"],
    safety: ["身分驗證", "雙向評價", "緊急聯絡"]
  }
];
```

---

## 7.2 補助與育兒預算試算 Demo

### 7.2.1 目的

把抽象的經濟焦慮轉化成具體數字，讓使用者看到可能的支出、補助與補助後負擔。

### 7.2.2 UI 元件

- 居住縣市 select
- 家庭月收入 input
- 胎次 select
- 托育方式 select
- 是否雙薪 toggle
- 是否租屋 toggle
- 是否有長輩支援 toggle
- 試算結果 cards
- 補助列表 cards

### 7.2.3 Mock Data

```ts
export const subsidies = [
  {
    id: "s1",
    title: "育兒津貼",
    amount: "每月 NT$5,000 起",
    description: "依家庭狀況與子女年齡適用不同補助。",
    type: "monthly"
  },
  {
    id: "s2",
    title: "托育補助",
    amount: "每月 NT$7,000 起",
    description: "適用公托、準公托或合格保母服務。",
    type: "monthly"
  },
  {
    id: "s3",
    title: "生育獎勵金",
    amount: "依縣市規定",
    description: "各縣市可能提供不同金額的一次性補助。",
    type: "one-time"
  }
];
```

### 7.2.4 Demo Calculation

可以使用簡化公式，不需要準確代表真實政策。

範例：

```ts
const baseMonthlyCost = 22000;
const childcareCost = selectedCareType === "public" ? 9000 : selectedCareType === "nanny" ? 18000 : 24000;
const totalSubsidy = 5000 + 7000;
const estimatedMonthlyBurden = baseMonthlyCost + childcareCost - totalSubsidy;
```

需在 UI 顯示：

```text
此為課堂 demo 試算，實際補助金額請以官方資訊為準。
```

---

## 7.3 托育資源地圖 Demo

### 7.3.1 目的

展示附近有哪些可使用的育兒資源，讓社會支持變得可見。

### 7.3.2 UI 元件

- 假地圖區塊
- 資源 pin / marker
- 左側或下方資源列表
- 篩選器
- 資源類型 badge
- 開放中 / 可預約 / 有補助標籤

### 7.3.3 Resource Types

- 公托
- 準公托
- 私托
- 合格保母
- 親子館
- 哺乳室
- 換尿布台
- 小兒科診所
- 兒童急診

### 7.3.4 Mock Data

```ts
export const childcareResources = [
  {
    id: "r1",
    name: "大安親子館",
    type: "親子館",
    distance: "500 m",
    status: "今日開放",
    tags: ["親子活動", "可報名", "室內空間"]
  },
  {
    id: "r2",
    name: "市立公托 A",
    type: "公托",
    distance: "900 m",
    status: "可預約參觀",
    tags: ["政府補助", "候補 3 人", "0-2歲"]
  },
  {
    id: "r3",
    name: "捷運站哺乳室",
    type: "哺乳室",
    distance: "300 m",
    status: "開放中",
    tags: ["換尿布台", "無障礙", "免費"]
  }
];
```

---

## 7.4 生育時間軸 Demo

### 7.4.1 目的

把未知流程轉化為可完成的任務清單。

### 7.4.2 UI 元件

- Timeline
- Progress bar
- Checklist
- Stage cards
- Recommended actions

### 7.4.3 Mock Data

```ts
export const roadmapStages = [
  {
    stage: "備孕期",
    progress: 25,
    tasks: ["健康檢查", "查詢生育補助", "討論伴侶分工", "了解托育選項"]
  },
  {
    stage: "懷孕期",
    progress: 50,
    tasks: ["產檢安排", "媽媽手冊", "查詢產假與陪產假", "選擇生產院所"]
  },
  {
    stage: "出生後",
    progress: 75,
    tasks: ["出生登記", "申請育兒津貼", "查詢托育補助", "尋找保母或托嬰中心"]
  }
];
```

---

## 7.5 社群焦慮破解 Demo

### 7.5.1 目的

回應社群媒體上常見的負面育兒敘事，把焦慮轉為具體資源。

### 7.5.2 UI 元件

- Anxiety cards
- FAQ accordion
- Ask BabyMap input box
- Suggested resource links
- Gentle response panel

### 7.5.3 Mock Data

```ts
export const anxietyCards = [
  {
    id: "a1",
    fear: "生小孩之後人生就毀了嗎？",
    response:
      "育兒確實會改變生活，但透過托育資源、伴侶分工與臨時支援，可以降低父母單獨承擔的壓力。",
    links: ["伴侶分工", "即時保姆", "托育補助"]
  },
  {
    id: "a2",
    fear: "我怕托育費用太高。",
    response:
      "平台可以根據居住地、家庭收入與托育方式，試算可申請補助與補助後實際負擔。",
    links: ["補助查詢", "預算試算"]
  },
  {
    id: "a3",
    fear: "如果臨時沒人幫忙怎麼辦？",
    response:
      "BabyCare Now 可以媒合附近經過認證的臨時保母，協助處理短時間照護需求。",
    links: ["即時保姆預約"]
  }
];
```

---

## 7.6 真實案例牆 Demo

### 7.6.1 目的

提供正向但不洗腦的育兒案例。

### 7.6.2 UI 元件

- Story cards
- Situation / Challenge / Support / Outcome sections
- Tags
- Location

### 7.6.3 Mock Data

```ts
export const parentingStories = [
  {
    id: "p1",
    title: "雙薪家庭，第一胎，台中",
    challenge: "擔心托嬰費用太高。",
    support: "準公托 + 托育補助 + 祖父母每週一天支援。",
    outcome: "每月實際負擔下降，父母仍維持工作。",
    tags: ["雙薪", "準公托", "第一胎"]
  },
  {
    id: "p2",
    title: "新北租屋家庭，第一胎",
    challenge: "不知道有哪些補助可以申請。",
    support: "生育獎勵金、育兒津貼、產假與陪產假規劃。",
    outcome: "生產前後流程更清楚，不確定感降低。",
    tags: ["租屋", "補助", "新手父母"]
  }
];
```

---

## 7.7 Dad Mode 父職專區 Demo

### 7.7.1 目的

避免平台只對媽媽說話，讓準爸爸也被納入育兒支持系統。

### 7.7.2 UI 元件

- Dad Mode card
- Checklist
- Resource tabs
- Fatherhood cue quote

### 7.7.3 Content

包含：

- 陪產假怎麼請
- 爸爸可以做的 10 件事
- 如何分擔夜間照顧
- 如何支持產後伴侶
- 爸爸育兒社群
- 父職真實案例
- 爸爸與小孩互動活動

---

## 8. Component 建議

### 8.1 Layout Components

```text
components/layout/Header.tsx
components/layout/Footer.tsx
components/layout/Section.tsx
components/layout/Container.tsx
```

### 8.2 Section Components

```text
components/sections/HeroSection.tsx
components/sections/ProblemSection.tsx
components/sections/FeatureGrid.tsx
components/sections/BabysitterBookingDemo.tsx
components/sections/BudgetPlannerDemo.tsx
components/sections/ResourceMapDemo.tsx
components/sections/TimelineDemo.tsx
components/sections/AnxietyBreakerDemo.tsx
components/sections/StoriesSection.tsx
components/sections/DadModeSection.tsx
components/sections/SafetySection.tsx
components/sections/FinalCTA.tsx
```

### 8.3 UI Components

Use shadcn/ui for:

```text
Button
Card
Badge
Tabs
Accordion
Dialog
Sheet
Input
Select
Switch
Slider
Progress
Separator
```

Use lucide-react for icons:

```text
Baby
MapPin
Calendar
ShieldCheck
HeartHandshake
Wallet
MessageCircleQuestion
Users
Clock
Star
PhoneCall
Sparkles
```

---

## 9. Suggested File Structure

```text
babymap/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
      Container.tsx
      Section.tsx
    sections/
      HeroSection.tsx
      ProblemSection.tsx
      FeatureGrid.tsx
      BabysitterBookingDemo.tsx
      BudgetPlannerDemo.tsx
      ResourceMapDemo.tsx
      TimelineDemo.tsx
      AnxietyBreakerDemo.tsx
      StoriesSection.tsx
      DadModeSection.tsx
      SafetySection.tsx
      FinalCTA.tsx
    ui/
      // shadcn/ui generated components
  data/
    babysitters.ts
    subsidies.ts
    resources.ts
    anxiety.ts
    stories.ts
    roadmap.ts
    features.ts
  lib/
    utils.ts
  public/
    // optional images or illustrations
  README.md
```

---

## 10. Interaction Requirements

### 10.1 Babysitter Demo

- Clicking a babysitter card should visually select it.
- Clicking 「立即預約」 can open a dialog.
- Dialog shows selected babysitter, time, price, safety notes.
- Button text can show 「確認預約 Demo」。
- No real booking action needed.

### 10.2 Budget Planner Demo

- Changing select inputs should update estimated monthly burden.
- Calculation may be simplified.
- Display disclaimer that numbers are demo only.

### 10.3 Anxiety Breaker Demo

- Clicking an anxiety card shows response.
- Suggested links can scroll to related sections or be static badges.
- Ask input does not need real AI. It can show a prewritten answer when submitted.

### 10.4 Resource Map Demo

- Map can be a stylized mock panel, not real map.
- Resource markers can be absolute-positioned dots.
- Clicking a marker can highlight a resource card.

### 10.5 Timeline Demo

- Checklist items can be clickable.
- Progress bar can update locally if desired.
- If too complex, static progress is acceptable.

---

## 11. Design Tokens

### 11.1 Color Direction

Suggested palette:

```css
--background: #fffaf3;
--foreground: #2f2f2f;
--primary: #f97356;
--primary-foreground: #ffffff;
--secondary: #dff5ee;
--secondary-foreground: #1f3d36;
--muted: #f4eee6;
--muted-foreground: #6f6a64;
--accent: #bfe6ff;
--accent-foreground: #183547;
--border: #eadfd2;
```

Use Tailwind utility classes if not customizing CSS variables.

### 11.2 Border Radius

Use large rounded corners:

```text
rounded-2xl
rounded-3xl
```

### 11.3 Shadow

Use soft shadows:

```text
shadow-sm
shadow-md
shadow-xl with low opacity
```

Avoid harsh dark shadows.

### 11.4 Typography

- Main heading: large, bold, tight tracking
- Body: readable, not too small
- Use Chinese-first typography-friendly spacing
- Avoid overly decorative fonts

---

## 12. Accessibility Requirements

- Buttons must have clear labels.
- Contrast should be readable.
- Form inputs need labels.
- Icons should not be the only way to communicate meaning.
- Motion should be subtle.
- Avoid fast flashing animation.
- All interactive elements should have focus states.

---

## 13. Content Guidelines

### 13.1 Do

Use language like:

```text
你可以先理解有哪些資源。
這些壓力可以被拆解與分攤。
我們幫你把資訊整理成可規劃的步驟。
生育不是一個人完成的事。
```

### 13.2 Avoid

Avoid language like:

```text
你應該生。
生小孩才完整。
不生會後悔。
生育是對國家的責任。
```

### 13.3 Tone

Tone should be:

- supportive
- non-judgmental
- practical
- evidence-aware
- calm
- not preachy

---

## 14. Codex Prompt 建議

可以把以下 prompt 丟給 Codex：

```text
Build a polished single-page Next.js App Router demo for a product called BabyMap.

BabyMap is a warm, trustworthy digital parenting support platform that helps people who want children but feel blocked by uncertainty, childcare anxiety, economic pressure, and negative social media narratives.

Use TypeScript, Tailwind CSS, shadcn/ui, lucide-react, and Framer Motion. Use mock data only. Do not build a backend.

The page should include:
1. Hero section with warm product messaging
2. Problem/theory section about turning digital anxiety into digital support
3. Bento feature grid
4. BabyCare Now instant babysitter booking demo
5. Subsidy and budget planner demo
6. Childcare resource map mockup
7. Fertility/parenting timeline checklist
8. Anxiety breaker / Ask BabyMap demo
9. Real parenting stories section
10. Dad Mode section
11. Safety and trust section
12. Final CTA

Style: warm, clean, modern, trustworthy, product-like. Avoid government website style, excessive pink, and over-the-top animations. Use soft gradients, rounded cards, clear typography, and responsive layout.
```

---

## 15. Acceptance Criteria

The demo is acceptable if:

- It runs locally with `npm run dev`.
- It has a polished single-page layout.
- It is responsive on desktop and mobile.
- It includes the four main demo areas:
  - 即時保姆預約
  - 補助與預算試算
  - 托育資源地圖
  - 社群焦慮破解
- It communicates the core message clearly:
  - 不是催生，而是降低想生者的不確定感。
- It uses mock data only.
- It does not require backend setup.
- It does not rely on real API keys.
- It does not use fear-based or moralizing language.

---

## 16. Future Extensions

If the project were developed beyond demo stage, possible extensions include:

- Real government subsidy API / data scraping pipeline
- Verified babysitter registration system
- Parent account system
- Real-time booking and payment
- Map API integration
- AI assistant with verified sources
- Calendar integration
- Notification system
- Review and safety reporting system
- Admin dashboard for verifying providers
- Multi-city data support
