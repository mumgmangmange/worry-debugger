import { worryStatuses } from "../constants/worries";
import type { WorryItem } from "../types";
import { isToday } from "./worries";

export function getWorryMetrics(worries: WorryItem[]) {
  return {
    total: worries.length,
    today: worries.filter((worry) => isToday(worry.createdAt)).length,
    action: worries.filter((worry) => worry.status === "실행").length,
    completed: worries.filter((worry) => worry.completedAt).length,
  };
}

export function filterWorries(worries: WorryItem[], query: string, categoryFilter: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return worries.filter((worry) => {
    const matchesCategory = categoryFilter === "전체" || worry.category === categoryFilter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      worry.title.toLowerCase().includes(normalizedQuery) ||
      worry.note.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

export function groupWorriesByStatus(worries: WorryItem[]) {
  return worryStatuses.map((status) => ({
    ...status,
    data: worries.filter((worry) => worry.status === status.value),
  }));
}
