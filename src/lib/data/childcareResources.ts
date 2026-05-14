export type ChildcareResource = {
  id: string;
  name: string;
  type: "公托" | "準公托" | "保母" | "親子館" | "哺乳室" | "小兒科";
  region: string;
  distance: string;
  status: string;
  isOpen: boolean;
  reservable: boolean;
  subsidized: boolean;
  action: string;
  tags: string[];
  position: string;
};

const mockChildcareResources: ChildcareResource[] = [
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

export function getChildcareResources(): ChildcareResource[] {
  try {
    // Future integration point:
    // Fetch and normalize government open data here, then return the normalized records.
    // If the fetch, schema validation, or normalization fails, keep falling back to local mocks.
    const externalResources: ChildcareResource[] | null = null;

    return externalResources ?? mockChildcareResources;
  } catch {
    return mockChildcareResources;
  }
}
