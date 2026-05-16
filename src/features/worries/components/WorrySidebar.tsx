import type { WorryDraft } from "../../../types";
import { Metric } from "./Metric";
import { WorryComposer } from "./WorryComposer";

interface WorrySidebarProps {
  draft: WorryDraft;
  metrics: {
    total: number;
    today: number;
    action: number;
    completed: number;
  };
  notice: string;
  onDraftChange: (draft: WorryDraft) => void;
  onAddWorry: () => void;
}

export function WorrySidebar({ draft, metrics, notice, onDraftChange, onAddWorry }: WorrySidebarProps) {
  return (
    <section className="mobile-section-divider space-y-5">
      <WorryComposer draft={draft} onDraftChange={onDraftChange} onSubmit={onAddWorry} />

      <div className="grid grid-cols-2 gap-3">
        <Metric label="전체 기록" value={metrics.total} />
        <Metric label="오늘 입력" value={metrics.today} />
        <Metric label="실행 항목" value={metrics.action} />
        <Metric label="완료" value={metrics.completed} />
      </div>

      <div className="rounded-lg border border-[#F5E5BA] bg-[#FFF8E8] p-4 text-sm text-[#7C5B24]">{notice}</div>
    </section>
  );
}
