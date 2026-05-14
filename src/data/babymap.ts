import {
  Baby,
  CalendarCheck,
  HeartHandshake,
  MapPin,
  MessageCircleQuestion,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

export const navItems = [
  { label: "功能", href: "#features" },
  { label: "即時保姆", href: "#babysitters" },
  { label: "補助試算", href: "#budget" },
  { label: "托育地圖", href: "#resources" },
  { label: "焦慮破解", href: "#anxiety" },
];

export const featureCards = [
  {
    title: "補助查詢",
    description: "把育兒津貼、托育補助與縣市加碼整理成可理解的清單。",
    tag: "降低資訊成本",
    icon: Wallet,
  },
  {
    title: "托育資源地圖",
    description: "看見附近的公托、親子館、哺乳室與兒科支援。",
    tag: "社會支持可視化",
    icon: MapPin,
  },
  {
    title: "即時保姆",
    description: "用 demo 流程展示臨時托育媒合與安全檢核。",
    tag: "降低照護焦慮",
    icon: Baby,
  },
  {
    title: "生育時間軸",
    description: "把備孕到孩子成長的流程整理成階段任務。",
    tag: "降低流程焦慮",
    icon: CalendarCheck,
  },
  {
    title: "焦慮破解",
    description: "把社群上的模糊恐懼拆成可查證、可規劃的問題。",
    tag: "回應數位焦慮",
    icon: MessageCircleQuestion,
  },
  {
    title: "父職與分工",
    description: "讓準爸爸與伴侶分工也成為平台支持的一部分。",
    tag: "共同育兒",
    icon: Users,
  },
  {
    title: "安全機制",
    description: "呈現認證、評價、服務紀錄與緊急聯絡的基本設計。",
    tag: "建立信任",
    icon: ShieldCheck,
  },
  {
    title: "真實案例",
    description: "用不誇張的家庭故事呈現可行的支持組合。",
    tag: "正向 cues",
    icon: HeartHandshake,
  },
];

export const babysitters = [
  {
    id: "b1",
    name: "陳小姐",
    distance: "1.2 km",
    rating: 4.9,
    availableTime: "今天 14:00-18:00",
    price: "NT$450 / hr",
    experience: "6 年經驗",
    tags: ["到府照顧", "0-3歲", "政府登記"],
    safety: ["身分驗證", "服務紀錄", "緊急聯絡"],
  },
  {
    id: "b2",
    name: "林小姐",
    distance: "2.0 km",
    rating: 4.8,
    availableTime: "最快 30 分鐘後",
    price: "NT$420 / hr",
    experience: "5 年經驗",
    tags: ["臨時托育", "接送服務", "雙向評價"],
    safety: ["背景審查", "家長評價", "平台保障"],
  },
  {
    id: "b3",
    name: "王小姐",
    distance: "2.8 km",
    rating: 4.7,
    availableTime: "今天 18:00-21:00",
    price: "NT$390 / hr",
    experience: "3 年經驗",
    tags: ["晚間支援", "幼兒照顧", "可短時段"],
    safety: ["身分驗證", "雙向評價", "緊急聯絡"],
  },
];

export const subsidies = [
  {
    id: "s1",
    title: "育兒津貼",
    amount: "每月 NT$5,000 起",
    description: "依家庭狀況與子女年齡適用不同補助。",
  },
  {
    id: "s2",
    title: "托育補助",
    amount: "每月 NT$7,000 起",
    description: "適用公托、準公托或合格保母服務。",
  },
  {
    id: "s3",
    title: "生育獎勵金",
    amount: "依縣市規定",
    description: "各縣市可能提供不同金額的一次性補助。",
  },
];

export const childcareResources = [
  {
    id: "r1",
    name: "大安親子館",
    type: "親子館",
    distance: "500 m",
    status: "今日開放",
    tags: ["親子活動", "可報名", "室內空間"],
    position: "left-[18%] top-[34%]",
  },
  {
    id: "r2",
    name: "市立公托 A",
    type: "公托",
    distance: "900 m",
    status: "可預約參觀",
    tags: ["政府補助", "候補 3 人", "0-2歲"],
    position: "left-[58%] top-[24%]",
  },
  {
    id: "r3",
    name: "捷運站哺乳室",
    type: "哺乳室",
    distance: "300 m",
    status: "開放中",
    tags: ["換尿布台", "無障礙", "免費"],
    position: "left-[72%] top-[64%]",
  },
];

export const roadmapStages = [
  {
    stage: "備孕期",
    progress: 25,
    tasks: ["健康檢查", "查詢生育補助", "討論伴侶分工", "了解托育選項"],
  },
  {
    stage: "懷孕期",
    progress: 50,
    tasks: ["產檢安排", "媽媽手冊", "查詢產假與陪產假", "選擇生產院所"],
  },
  {
    stage: "出生後",
    progress: 75,
    tasks: ["出生登記", "申請育兒津貼", "查詢托育補助", "尋找保母或托嬰中心"],
  },
];

export const anxietyCards = [
  {
    id: "a1",
    fear: "生小孩之後人生就毀了嗎？",
    response:
      "育兒確實會改變生活，但透過托育資源、伴侶分工與臨時支援，可以降低父母單獨承擔的壓力。",
    links: ["伴侶分工", "即時保姆", "托育補助"],
  },
  {
    id: "a2",
    fear: "我怕托育費用太高。",
    response:
      "平台可以根據居住地、家庭收入與托育方式，試算可申請補助與補助後實際負擔。",
    links: ["補助查詢", "預算試算"],
  },
  {
    id: "a3",
    fear: "如果臨時沒人幫忙怎麼辦？",
    response:
      "BabyCare Now 可以媒合附近經過認證的臨時保母，協助處理短時間照護需求。",
    links: ["即時保姆預約"],
  },
];

export const parentingStories = [
  {
    id: "p1",
    title: "雙薪家庭，第一胎，台中",
    challenge: "擔心托嬰費用太高。",
    support: "準公托 + 托育補助 + 祖父母每週一天支援。",
    outcome: "每月實際負擔下降，父母仍維持工作。",
    tags: ["雙薪", "準公托", "第一胎"],
  },
  {
    id: "p2",
    title: "新北租屋家庭，第一胎",
    challenge: "不知道有哪些補助可以申請。",
    support: "生育獎勵金、育兒津貼、產假與陪產假規劃。",
    outcome: "生產前後流程更清楚，不確定感降低。",
    tags: ["租屋", "補助", "新手父母"],
  },
];
