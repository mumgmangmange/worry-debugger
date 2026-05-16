import { type ChangeEvent, type RefObject } from "react";
import { Download, FileUp, RotateCcw } from "lucide-react";

interface AppHeaderProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onGoHome: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onResetDemo: () => void;
}

export function AppHeader({ fileInputRef, onGoHome, onExport, onImport, onResetDemo }: AppHeaderProps) {
  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
    event.target.value = "";
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between lg:px-8">
        <button type="button" className="text-left" onClick={onGoHome} aria-label="메인 화면으로 이동">
          <p className="text-sm font-bold text-[#2D6A4F]">Worry Debugger</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">고민 디버거</h1>
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <button className="toolbar-button" type="button" onClick={onExport}>
            <Download size={18} />
            내보내기
          </button>
          <button className="toolbar-button" type="button" onClick={() => fileInputRef.current?.click()}>
            <FileUp size={18} />
            가져오기
          </button>
          <button className="toolbar-button" type="button" onClick={onResetDemo}>
            <RotateCcw size={18} />
            샘플 초기화
          </button>
          <input ref={fileInputRef} className="hidden" type="file" accept="application/json" onChange={handleImport} />
        </div>
      </div>
    </header>
  );
}
