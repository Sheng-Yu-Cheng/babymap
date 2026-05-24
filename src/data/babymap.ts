import {
  Baby,
  CalendarCheck,
  ClipboardCheck,
  HeartHandshake,
  MapPin,
  MessageCircleQuestion,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

export const navItems = [
  { label: "即時保姆", href: "/booking" },
  { label: "補助試算", href: "/subsidies" },
  { label: "托育地圖", href: "/resources" },
  { label: "焦慮破解", href: "/anxiety" },
  { label: "父職專區", href: "/dad-mode" },
];

export const portalActions = [
  {
    title: "查找育兒資源",
    description: "從公托、親子館到兒科診所，先看見附近有哪些支持。",
    href: "/resources",
    icon: MapPin,
  },
  {
    title: "預約即時保姆",
    description: "臨時加班、長輩無法支援時，查看合格保母媒合流程。",
    href: "/booking",
    icon: Baby,
  },
  {
    title: "破解生育焦慮",
    description: "把社群上的模糊恐懼，轉成可查證、可處理的問題。",
    href: "/anxiety",
    icon: MessageCircleQuestion,
  },
];

export const portalCategories = [
  {
    title: "生育前規劃",
    description: "補助試算、時間軸、父職準備，先把流程和分工看清楚。",
    links: [
      { label: "補助與預算試算", href: "/subsidies" },
      { label: "生育時間軸導航", href: "/roadmap" },
      { label: "父職專區", href: "/dad-mode" },
    ],
  },
  {
    title: "托育與照護",
    description: "把附近資源、臨時保母與安全機制整理成可使用的支持。",
    links: [
      { label: "即時保姆預約", href: "/booking" },
      { label: "托育資源地圖", href: "/resources" },
      { label: "安全與認證機制", href: "/safety" },
    ],
  },
  {
    title: "資訊與支持",
    description: "用真實案例與焦慮破解，降低被負面敘事放大的不確定感。",
    links: [
      { label: "社群焦慮破解", href: "/anxiety" },
      { label: "真實育兒案例", href: "/stories" },
      { label: "安全與認證機制", href: "/safety" },
    ],
  },
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

export const relatedFeatureLinks = {
  booking: [
    { label: "托育資源地圖", href: "/resources" },
    { label: "安全與認證機制", href: "/safety" },
    { label: "補助與預算試算", href: "/subsidies" },
  ],
  subsidies: [
    { label: "生育時間軸導航", href: "/roadmap" },
    { label: "托育資源地圖", href: "/resources" },
  ],
  resources: [
    { label: "即時保姆預約", href: "/booking" },
    { label: "安全與認證機制", href: "/safety" },
    { label: "真實育兒案例", href: "/stories" },
  ],
  anxiety: [
    { label: "補助與預算試算", href: "/subsidies" },
    { label: "父職專區", href: "/dad-mode" },
    { label: "真實育兒案例", href: "/stories" },
  ],
  roadmap: [
    { label: "補助與預算試算", href: "/subsidies" },
    { label: "父職專區", href: "/dad-mode" },
  ],
  stories: [
    { label: "社群焦慮破解", href: "/anxiety" },
    { label: "補助與預算試算", href: "/subsidies" },
    { label: "托育資源地圖", href: "/resources" },
  ],
  dadMode: [
    { label: "生育時間軸導航", href: "/roadmap" },
    { label: "社群焦慮破解", href: "/anxiety" },
    { label: "補助與預算試算", href: "/subsidies" },
  ],
  safety: [{ label: "即時保姆預約", href: "/booking" }],
};

export const dadModeItems = [
  "陪產假與育嬰假怎麼請",
  "夜間照顧如何分工",
  "產後伴侶支持清單",
  "爸爸與孩子互動活動",
];

export const safetySteps = [
  {
    title: "資格與身份驗證",
    description: "確認政府登記、身份資料、服務範圍與可服務年齡。",
    icon: ClipboardCheck,
  },
  {
    title: "服務紀錄留存",
    description: "每次媒合留下時間、地點、需求與緊急聯絡資訊。",
    icon: ShieldCheck,
  },
  {
    title: "雙向評價機制",
    description: "家長與保母都能留下回饋，讓下一次選擇更安心。",
    icon: HeartHandshake,
  },
];

export type Babysitter = {
  id: string;
  name: string;
  avatarInitials?: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  pricePerHour: number;
  availableTime: string;
  experienceYears: number;
  certified: boolean;
  verificationBadges: string[];
  serviceTags: string[];
  ageRange: string;
  intro: string;
  location: {
    district: string;
    addressLabel: string;
    lat: number;
    lng: number;
  };
};

export const babysitters: Babysitter[] = [
  {
    id: "b1",
    name: "陳小姐",
    avatarInitials: "陳",
    rating: 4.9,
    reviewCount: 128,
    distanceKm: 1.2,
    pricePerHour: 450,
    availableTime: "今天 14:00-18:00",
    experienceYears: 6,
    certified: true,
    verificationBadges: ["政府登記", "身分驗證", "背景審查"],
    serviceTags: ["到府照顧", "0-3歲", "臨時托育"],
    ageRange: "0-3 歲",
    intro: "擅長嬰幼兒日常照護與晚間短時段支援。",
    location: {
      district: "大安區",
      addressLabel: "大安森林公園附近",
      lat: 25.0262,
      lng: 121.5435,
    },
  },
  {
    id: "b2",
    name: "林小姐",
    avatarInitials: "林",
    rating: 4.8,
    reviewCount: 96,
    distanceKm: 2.0,
    pricePerHour: 420,
    availableTime: "最快 30 分鐘後",
    experienceYears: 5,
    certified: true,
    verificationBadges: ["政府登記", "托育人員登記", "雙向評價"],
    serviceTags: ["臨時托育", "接送服務", "1-6歲"],
    ageRange: "1-6 歲",
    intro: "可支援幼兒園接送、短時段陪伴與餐點協助。",
    location: {
      district: "信義區",
      addressLabel: "信義安和站附近",
      lat: 25.033,
      lng: 121.5654,
    },
  },
  {
    id: "b3",
    name: "王小姐",
    avatarInitials: "王",
    rating: 4.7,
    reviewCount: 74,
    distanceKm: 2.8,
    pricePerHour: 390,
    availableTime: "今天 18:00-21:00",
    experienceYears: 3,
    certified: true,
    verificationBadges: ["政府登記", "身分驗證", "緊急聯絡"],
    serviceTags: ["晚間支援", "幼兒照顧", "產後短時支援"],
    ageRange: "0-6 歲",
    intro: "熟悉晚間照護與新手父母短時段支援。",
    location: {
      district: "松山區",
      addressLabel: "民生社區附近",
      lat: 25.0497,
      lng: 121.577,
    },
  },
  {
    id: "b4",
    name: "張小姐",
    avatarInitials: "張",
    rating: 4.9,
    reviewCount: 142,
    distanceKm: 3.1,
    pricePerHour: 480,
    availableTime: "今天 15:00-20:00",
    experienceYears: 8,
    certified: true,
    verificationBadges: ["政府登記", "背景審查", "平台客服"],
    serviceTags: ["到府照顧", "0-1歲", "產後短時支援"],
    ageRange: "0-1 歲",
    intro: "專長為新生兒照護、餵奶紀錄與產後家庭短時支援。",
    location: {
      district: "中正區",
      addressLabel: "古亭站附近",
      lat: 25.0324,
      lng: 121.5198,
    },
  },
  {
    id: "b5",
    name: "黃小姐",
    avatarInitials: "黃",
    rating: 4.8,
    reviewCount: 88,
    distanceKm: 3.6,
    pricePerHour: 430,
    availableTime: "明天 09:00-13:00",
    experienceYears: 4,
    certified: true,
    verificationBadges: ["托育人員登記", "身分驗證", "服務紀錄"],
    serviceTags: ["接送服務", "3-6歲", "臨時托育"],
    ageRange: "3-6 歲",
    intro: "可協助幼兒接送、戶外活動陪同與短時照顧。",
    location: {
      district: "中山區",
      addressLabel: "行天宮站附近",
      lat: 25.0644,
      lng: 121.5337,
    },
  },
  {
    id: "b6",
    name: "蔡小姐",
    avatarInitials: "蔡",
    rating: 4.7,
    reviewCount: 63,
    distanceKm: 4.2,
    pricePerHour: 410,
    availableTime: "今天 16:00-19:00",
    experienceYears: 5,
    certified: true,
    verificationBadges: ["政府登記", "雙向評價", "緊急聯絡"],
    serviceTags: ["到府照顧", "1-3歲", "可短時段"],
    ageRange: "1-3 歲",
    intro: "熟悉幼兒遊戲陪伴、點心時間與睡前流程。",
    location: {
      district: "文山區",
      addressLabel: "萬芳醫院附近",
      lat: 24.997,
      lng: 121.57,
    },
  },
];

export const bookingServiceTypes = ["到府照顧", "臨時托育", "接送服務", "產後短時支援"];

export const bookingSafetyProtections = [
  "政府登記",
  "身分驗證",
  "背景審查",
  "服務紀錄",
  "緊急聯絡",
  "雙向評價",
  "平台客服",
];

export const childcareResources = [
  {
    id: "r1",
    name: "大安親子館",
    type: "親子館",
    region: "台北市大安區",
    distance: "500 m",
    status: "今日開放",
    isOpen: true,
    reservable: true,
    subsidized: false,
    action: "查看活動",
    tags: ["親子活動", "可報名", "室內空間"],
    position: "left-[18%] top-[34%]",
  },
  {
    id: "r2",
    name: "市立大安公托",
    type: "公托",
    region: "台北市大安區",
    distance: "900 m",
    status: "可預約參觀",
    isOpen: true,
    reservable: true,
    subsidized: true,
    action: "預約參觀",
    tags: ["政府補助", "候補 3 人", "0-2歲"],
    position: "left-[58%] top-[24%]",
  },
  {
    id: "r3",
    name: "捷運站哺乳室",
    type: "哺乳室",
    region: "台北市大安區",
    distance: "300 m",
    status: "開放中",
    isOpen: true,
    reservable: false,
    subsidized: false,
    action: "查看位置",
    tags: ["換尿布台", "無障礙", "免費"],
    position: "left-[72%] top-[64%]",
  },
  {
    id: "r4",
    name: "安心準公托中心",
    type: "準公托",
    region: "台北市大安區",
    distance: "1.1 km",
    status: "可預約諮詢",
    isOpen: true,
    reservable: true,
    subsidized: true,
    action: "預約諮詢",
    tags: ["托育補助", "2 歲以下", "名額有限"],
    position: "left-[36%] top-[68%]",
  },
  {
    id: "r5",
    name: "合格保母林小姐",
    type: "保母",
    region: "台北市大安區",
    distance: "1.4 km",
    status: "今日可媒合",
    isOpen: true,
    reservable: true,
    subsidized: true,
    action: "查看檔案",
    tags: ["政府登記", "到府照顧", "臨時托育"],
    position: "left-[78%] top-[28%]",
  },
  {
    id: "r6",
    name: "仁愛小兒科",
    type: "小兒科",
    region: "台北市大安區",
    distance: "1.8 km",
    status: "看診中",
    isOpen: true,
    reservable: false,
    subsidized: false,
    action: "查看電話",
    tags: ["疫苗諮詢", "兒童門診", "晚診"],
    position: "left-[45%] top-[42%]",
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
    fear: "「生小孩之後人生就毀了。」",
    response:
      "這種擔心很真實，因為育兒確實會改變時間、金錢與生活節奏。BabyMap 不會叫你忽略壓力，而是先幫你看見托育資源、伴侶分工與臨時支援，讓責任不要只落在一個人身上。",
    links: ["伴侶分工", "即時保姆", "托育補助"],
  },
  {
    id: "a2",
    fear: "「托育費用太高，根本負擔不起。」",
    response:
      "經濟壓力需要被認真計算，而不是用樂觀口號帶過。你可以先用補助與預算試算，估算不同托育方式的支出、可申請補助與補助後負擔。",
    links: ["補助查詢", "預算試算"],
  },
  {
    id: "a3",
    fear: "「如果臨時沒人幫忙，我會完全撐不住。」",
    response:
      "照護中斷會讓人很慌，尤其是雙薪家庭或缺乏親友支援時。BabyCare Now 示範如何媒合附近經過認證的臨時保母，也可以搭配托育地圖先查可用資源。",
    links: ["即時保姆預約", "托育資源地圖", "安全機制"],
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
