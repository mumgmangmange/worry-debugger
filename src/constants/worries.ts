import { Archive, CheckCircle2, Clock, Leaf, type LucideIcon } from "lucide-react";
import type { BadgeTone, WorryItem, WorryStatus } from "../types";

export interface WorryStatusOption {
  value: WorryStatus;
  label: string;
  desc: string;
  tone: BadgeTone;
}

export const worryCategories = ["일", "관계", "돈", "건강", "공부", "집안일", "기타"];

export const worryStatuses: WorryStatusOption[] = [
  { value: "실행", label: "실행", desc: "지금 할 수 있는 다음 행동이 있어요.", tone: "action" },
  { value: "보류", label: "보류", desc: "나중에 다시 확인하면 충분해요.", tone: "later" },
  { value: "기록", label: "기록", desc: "행동은 없지만 남겨둘 가치가 있어요.", tone: "note" },
  { value: "내려놓기", label: "내려놓기", desc: "지금 내가 통제할 수 없는 걱정이에요.", tone: "release" },
];

export const statusIcon: Record<WorryStatus, LucideIcon> = {
  실행: CheckCircle2,
  보류: Clock,
  기록: Archive,
  내려놓기: Leaf,
};

export const seedWorries: WorryItem[] = [
  createSeedWorry("seed-1", "예시) 할 일이 너무 많아서 뭐부터 해야 할지 모르겠다", "일", "실행", "오늘 꼭 해야 할 일 3개만 적기"),
  createSeedWorry("seed-2", "예시) 주말 약속을 잡을지 말지 걱정된다", "관계", "보류", "금요일 컨디션 보고 답장하기"),
  createSeedWorry("seed-3", "예시) 돈을 조금 더 아껴야 할 것 같다", "돈", "기록", "이번 달 고정지출 먼저 확인하기")
];

function createSeedWorry(
  id: string,
  title: string,
  category: string,
  status: WorryStatus,
  note: string,
): WorryItem {
  return {
    id,
    title,
    category,
    status,
    note,
    createdAt: new Date().toISOString(),
  };
}
