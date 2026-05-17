import { Search } from "lucide-react";
import { worryCategories, type WorryStatusOption } from "../../../constants/worries";
import type { WorryItem } from "../../../types";
import { Badge } from "../../../components/ui/Badge";
import { WorryBoardCard } from "./WorryBoardCard";

interface WorryColumn extends WorryStatusOption {
  data: WorryItem[];
}

interface WorryBoardProps {
  columns: WorryColumn[];
  selectedWorryId?: string;
  query: string;
  categoryFilter: string;
  onQueryChange: (query: string) => void;
  onCategoryFilterChange: (category: string) => void;
  onSelectWorry: (id: string) => void;
  onCompleteWorry: (id: string) => void;
}

export function WorryBoard({
  columns,
  selectedWorryId,
  query,
  categoryFilter,
  onQueryChange,
  onCategoryFilterChange,
  onSelectWorry,
  onCompleteWorry,
}: WorryBoardProps) {
  return (
    <section className="mobile-section-divider min-w-0 rounded-lg border border-white bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">걱정 보드</h2>
          <p className="mt-1 text-sm text-slate-500">상태별로 옮기고, 완료하거나 백업할 수 있습니다.</p>
        </div>
        <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-[#F9F7F2] px-3 md:w-72">
          <Search size={17} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="걱정 또는 메모 검색"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {["전체", ...worryCategories].map((category) => (
          <button
            key={category}
            type="button"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
              categoryFilter === category ? "bg-slate-900 text-white" : "bg-[#F4F1EA] text-slate-600"
            }`}
            onClick={() => onCategoryFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.value} className="rounded-lg bg-[#F9F7F2] p-3">
            <div className="mb-3 flex items-center justify-between">
              <Badge tone={column.tone}>{column.label}</Badge>
              <span className="text-xs font-bold text-slate-400">{column.data.length}</span>
            </div>
            <div className="space-y-3">
              {column.data.map((worry) => (
                <WorryBoardCard
                  key={worry.id}
                  worry={worry}
                  selected={selectedWorryId === worry.id}
                  onSelect={() => onSelectWorry(worry.id)}
                  onComplete={() => onCompleteWorry(worry.id)}
                />
              ))}
              {column.data.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/60 p-5 text-center text-sm text-slate-400">
                  비어있어요
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
