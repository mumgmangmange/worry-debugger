import { Plus } from "lucide-react";
import { worryCategories, worryStatuses } from "../../../constants/worries";
import type { WorryDraft, WorryStatus } from "../../../types";

interface WorryComposerProps {
  draft: WorryDraft;
  onDraftChange: (draft: WorryDraft) => void;
  onSubmit: () => void;
}

export function WorryComposer({ draft, onDraftChange, onSubmit }: WorryComposerProps) {
  return (
    <div className="rounded-lg border border-white bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Plus size={19} />
        <h2 className="text-lg font-bold">걱정 입력</h2>
      </div>
      <textarea
        className="mt-4 h-32 w-full resize-none rounded-lg border border-slate-200 bg-[#F9F7F2] p-3 text-sm outline-none focus:border-slate-700"
        placeholder="예) 할 일이 너무 많아서 뭐부터 해야 할지 모르겠다"
        value={draft.title}
        onChange={(event) => onDraftChange({ ...draft, title: event.target.value })}
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-sm font-bold text-slate-600">
          카테고리
          <select
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"
            value={draft.category}
            onChange={(event) => onDraftChange({ ...draft, category: event.target.value })}
          >
            {worryCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-slate-600">
          분류
          <select
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"
            value={draft.status}
            onChange={(event) => onDraftChange({ ...draft, status: event.target.value as WorryStatus })}
          >
            {worryStatuses.map((status) => (
              <option key={status.value}>{status.value}</option>
            ))}
          </select>
        </label>
      </div>

      <input
        className="mt-3 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-700"
        placeholder="다음 행동 또는 메모"
        value={draft.note}
        onChange={(event) => onDraftChange({ ...draft, note: event.target.value })}
      />

      <button
        type="button"
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-bold text-white"
        onClick={onSubmit}
      >
        <Plus size={18} />
        저장하기
      </button>
    </div>
  );
}
