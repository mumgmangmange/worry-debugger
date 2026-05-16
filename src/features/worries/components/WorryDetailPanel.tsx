import { CheckCircle2, Trash2 } from "lucide-react";
import { worryStatuses } from "../../../constants/worries";
import type { WorryItem, WorryStatus } from "../../../types";
import { formatDate } from "../../../utils/worries";
import { Badge } from "../../../components/ui/Badge";

interface WorryDetailPanelProps {
  worry: WorryItem | null;
  onChangeStatus: (status: WorryStatus) => void;
  onComplete: () => void;
  onDelete: () => void;
}

export function WorryDetailPanel({ worry, onChangeStatus, onComplete, onDelete }: WorryDetailPanelProps) {
  return (
    <aside className="rounded-lg border border-white bg-white p-5 shadow-sm">
      {worry ? (
        <WorryDetail worry={worry} onChangeStatus={onChangeStatus} onComplete={onComplete} onDelete={onDelete} />
      ) : (
        <div className="flex h-full min-h-64 items-center justify-center rounded-lg bg-[#F9F7F2] text-sm text-slate-400">
          선택된 기록이 없습니다.
        </div>
      )}
    </aside>
  );
}

function WorryDetail({
  worry,
  onChangeStatus,
  onComplete,
  onDelete,
}: {
  worry: WorryItem;
  onChangeStatus: (status: WorryStatus) => void;
  onComplete: () => void;
  onDelete: () => void;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500">선택한 고민</p>
          <h2 className="mt-2 text-xl font-extrabold leading-tight">{worry.title}</h2>
        </div>
        <Badge>{worry.category}</Badge>
      </div>

      <div className="mt-5 rounded-lg bg-[#F9F7F2] p-4">
        <p className="text-xs font-bold text-slate-500">다음 행동 / 메모</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{worry.note}</p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-bold text-slate-700">분류 변경</p>
        <div className="grid grid-cols-2 gap-2">
          {worryStatuses.map((status) => (
            <button
              key={status.value}
              type="button"
              className={`rounded-lg border px-3 py-2 text-sm font-bold ${
                worry.status === status.value
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
              onClick={() => onChangeStatus(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-500">
        <p>생성일: {formatDate(worry.createdAt)}</p>
        {worry.completedAt && <p>완료일: {formatDate(worry.completedAt)}</p>}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#E6F3EC] text-sm font-bold text-[#2D6A4F]"
          onClick={onComplete}
          disabled={Boolean(worry.completedAt)}
        >
          <CheckCircle2 size={17} />
          완료
        </button>
        <button
          type="button"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FFF1D6] text-sm font-bold text-[#9A5B00]"
          onClick={onDelete}
        >
          <Trash2 size={17} />
          삭제
        </button>
      </div>
    </div>
  );
}
