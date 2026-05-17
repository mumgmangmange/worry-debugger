import { statusIcon } from "../../../constants/worries";
import type { WorryItem } from "../../../types";
import { Badge } from "../../../components/ui/Badge";

interface WorryBoardCardProps {
  worry: WorryItem;
  selected: boolean;
  onSelect: () => void;
  onComplete: () => void;
}

export function WorryBoardCard({ worry, selected, onSelect, onComplete }: WorryBoardCardProps) {
  const Icon = statusIcon[worry.status];

  return (
    <article
      className={`rounded-lg border bg-white p-4 text-left shadow-sm transition ${
        selected ? "border-slate-900" : "border-white"
      }`}
    >
      <button type="button" className="block w-full text-left" onClick={onSelect}>
        <div className="flex items-start justify-between gap-3">
          <Icon size={18} className="mt-0.5 shrink-0 text-slate-500" />
          {worry.completedAt && <Badge tone="success">완료</Badge>}
        </div>
        <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900">{worry.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{worry.note}</p>
      </button>
      <div className="mt-3 flex items-center justify-between">
        <Badge>{worry.category}</Badge>
        {worry.status === "실행" && !worry.completedAt && (
          <button
            type="button"
            className="rounded-full bg-[#E6F3EC] px-3 py-1 text-xs font-bold text-[#2D6A4F]"
            onClick={onComplete}
          >
            완료
          </button>
        )}
      </div>
    </article>
  );
}
