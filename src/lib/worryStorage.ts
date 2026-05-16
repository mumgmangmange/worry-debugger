import type { WorryDraft, WorryItem } from "../types";

const STORAGE_KEY = "worry-debugger.records.v1";

export function createWorry(draft: WorryDraft): WorryItem {
  return {
    ...draft,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

export function loadWorries(): WorryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isWorryItem);
  } catch {
    return [];
  }
}

export function saveWorries(worries: WorryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(worries));
}

export function mergeWorries(current: WorryItem[], incoming: WorryItem[]) {
  const currentIds = new Set(current.map((worry) => worry.id));
  const uniqueIncoming = incoming.filter((worry) => !currentIds.has(worry.id));

  return {
    worries: [...uniqueIncoming, ...current],
    addedCount: uniqueIncoming.length,
    skippedCount: incoming.length - uniqueIncoming.length,
  };
}

export function parseBackupFile(raw: string): WorryItem[] {
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("백업 파일 형식이 올바르지 않습니다.");
  }

  const validItems = parsed.filter(isWorryItem);
  if (validItems.length !== parsed.length) {
    throw new Error("백업 파일에 지원하지 않는 기록 형식이 포함되어 있습니다.");
  }

  return validItems;
}

function isWorryItem(value: unknown): value is WorryItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<WorryItem>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.category === "string" &&
    typeof item.note === "string" &&
    typeof item.createdAt === "string" &&
    ["실행", "보류", "기록", "내려놓기"].includes(String(item.status))
  );
}
