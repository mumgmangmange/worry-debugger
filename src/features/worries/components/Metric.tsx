interface MetricProps {
  label: string;
  value: number;
}

export function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-lg border border-white bg-white p-4 shadow-sm">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
