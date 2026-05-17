import { useEffect, useMemo, useState } from "react";
import { seedWorries } from "../constants/worries";
import type { WorryDraft, WorryItem, WorryStatus } from "../types";
import { createWorry, loadWorries, mergeWorries, parseBackupFile, saveWorries } from "../lib/worryStorage";
import { filterWorries, getWorryMetrics, groupWorriesByStatus } from "../utils/worryFilters";
import { defaultNote } from "../utils/worries";

const emptyDraft: WorryDraft = {
  title: "",
  category: "일",
  status: "실행",
  note: "",
};

export function useWorries() {
  const [worries, setWorries] = useState<WorryItem[]>(() => {
    const saved = loadWorries();
    return saved.length > 0 ? saved : seedWorries;
  });
  const [draft, setDraft] = useState<WorryDraft>(emptyDraft);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [notice, setNotice] = useState("브라우저에 자동 저장됩니다.");

  useEffect(() => {
    saveWorries(worries);
  }, [worries]);

  const selectedWorry = worries.find((worry) => worry.id === selectedId) ?? worries[0] ?? null;
  const metrics = useMemo(() => getWorryMetrics(worries), [worries]);

  const filteredWorries = useMemo(() => filterWorries(worries, query, categoryFilter), [categoryFilter, query, worries]);
  const columns = useMemo(() => groupWorriesByStatus(filteredWorries), [filteredWorries]);

  const addWorry = () => {
    if (!draft.title.trim()) {
      setNotice("걱정을 한 문장 이상 입력해주세요.");
      return;
    }

    const worry = createWorry({
      ...draft,
      title: draft.title.trim(),
      note: draft.note.trim() || defaultNote(draft.status),
    });

    setWorries((current) => [worry, ...current]);
    setDraft(emptyDraft);
    setSelectedId(worry.id);
    setNotice("새 걱정을 저장했습니다.");
  };

  const updateStatus = (id: string, status: WorryStatus) => {
    setWorries((current) =>
      current.map((worry) =>
        worry.id === id
          ? {
              ...worry,
              status,
              completedAt: status === "실행" ? worry.completedAt : undefined,
            }
          : worry,
      ),
    );
  };

  const completeWorry = (id: string) => {
    setWorries((current) =>
      current.map((worry) =>
        worry.id === id ? { ...worry, completedAt: worry.completedAt ?? new Date().toISOString() } : worry,
      ),
    );
    setNotice("실행 항목을 완료로 표시했습니다.");
  };

  const deleteWorry = (id: string) => {
    setWorries((current) => current.filter((worry) => worry.id !== id));
    setSelectedId(null);
    setNotice("기록을 삭제했습니다.");
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(worries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `worry-debugger-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("JSON 백업 파일을 만들었습니다.");
  };

  const importBackupFile = async (file: File) => {
    try {
      const incoming = parseBackupFile(await file.text());
      const result = mergeWorries(worries, incoming);
      setWorries(result.worries);
      setNotice(`가져오기 완료: 새 기록 ${result.addedCount}개, 중복 ${result.skippedCount}개 제외`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "백업 파일을 읽지 못했습니다.");
    }
  };

  const resetDemo = () => {
    setWorries(seedWorries);
    setSelectedId(seedWorries[0].id);
    setNotice("샘플 데이터로 초기화했습니다.");
  };

  const goHome = () => {
    setQuery("");
    setCategoryFilter("전체");
    setSelectedId(null);
    setNotice("메인 화면으로 이동했습니다.");
  };

  const updateSelectedStatus = (status: WorryStatus) => {
    if (selectedWorry) {
      updateStatus(selectedWorry.id, status);
    }
  };

  const completeSelectedWorry = () => {
    if (selectedWorry) {
      completeWorry(selectedWorry.id);
    }
  };

  const deleteSelectedWorry = () => {
    if (selectedWorry) {
      deleteWorry(selectedWorry.id);
    }
  };

  return {
    worries,
    draft,
    selectedWorry,
    columns,
    query,
    categoryFilter,
    notice,
    metrics,
    setDraft,
    setSelectedId,
    setQuery,
    setCategoryFilter,
    addWorry,
    updateStatus,
    completeWorry,
    deleteWorry,
    updateSelectedStatus,
    completeSelectedWorry,
    deleteSelectedWorry,
    exportBackup,
    importBackupFile,
    resetDemo,
    goHome,
  };
}
