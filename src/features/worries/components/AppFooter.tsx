export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white/85">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-5 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-bold text-slate-700">Worry Debugger</p>
        <p>Copyright © {year} Worry Debugger. All rights reserved.</p>
        <p>문의/개선사항: 우측 상단 Google Form</p>
      </div>
    </footer>
  );
}
