import type { WorryStatus } from "../types";

export function defaultNote(status: WorryStatus) {
  const noteMap: Record<WorryStatus, string> = {
    실행: "가장 작은 다음 행동을 정해보세요.",
    보류: "다시 확인할 시점을 정해두세요.",
    기록: "일단 기록으로 남겨두세요.",
    내려놓기: "지금 통제할 수 없는 걱정으로 표시했어요.",
  };

  return noteMap[status];
}

export function isToday(value: string) {
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
