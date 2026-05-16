export type WorryStatus = "실행" | "보류" | "기록" | "내려놓기";

export type BadgeTone =
  | "action"
  | "later"
  | "note"
  | "release"
  | "backup"
  | "success"
  | "warning"
  | "neutral";

export interface WorryItem {
  id: string;
  title: string;
  category: string;
  status: WorryStatus;
  note: string;
  createdAt: string;
  completedAt?: string;
}

export interface WorryDraft {
  title: string;
  category: string;
  status: WorryStatus;
  note: string;
}
