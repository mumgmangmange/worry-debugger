import type { PropsWithChildren } from "react";
import type { BadgeTone } from "../../types";

interface BadgeProps extends PropsWithChildren {
  tone?: BadgeTone;
}

const toneClassName: Record<BadgeTone, string> = {
  action: "bg-[#E6F3EC] text-[#2D6A4F]",
  later: "bg-[#F2EADB] text-[#8A5A12]",
  note: "bg-[#E9ECF7] text-[#4452A3]",
  release: "bg-[#ECE7F2] text-[#6D4A85]",
  backup: "bg-[#EAF2F8] text-[#2F5F7C]",
  success: "bg-[#E6F3EC] text-[#2D6A4F]",
  warning: "bg-[#FFF1D6] text-[#9A5B00]",
  neutral: "bg-slate-100 text-slate-500",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClassName[tone]}`}>
      {children}
    </span>
  );
}
