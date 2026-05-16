import { useRef } from "react";
import { AppHeader } from "./features/worries/components/AppHeader";
import { WorryBoard } from "./features/worries/components/WorryBoard";
import { WorryDetailPanel } from "./features/worries/components/WorryDetailPanel";
import { WorrySidebar } from "./features/worries/components/WorrySidebar";
import { useWorries } from "./hooks/useWorries";

export default function WorryDebuggerApp() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const worries = useWorries();

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-slate-900">
      <AppHeader
        fileInputRef={fileInputRef}
        onGoHome={worries.goHome}
        onExport={worries.exportBackup}
        onImport={worries.importBackupFile}
        onResetDemo={worries.resetDemo}
      />

      <main className="mx-auto grid max-w-[1600px] gap-5 px-5 py-6 lg:grid-cols-[320px_minmax(0,1fr)_300px] lg:px-8">
        <WorrySidebar
          draft={worries.draft}
          metrics={worries.metrics}
          notice={worries.notice}
          onDraftChange={worries.setDraft}
          onAddWorry={worries.addWorry}
        />

        <WorryBoard
          columns={worries.columns}
          selectedWorryId={worries.selectedWorry?.id}
          query={worries.query}
          categoryFilter={worries.categoryFilter}
          onQueryChange={worries.setQuery}
          onCategoryFilterChange={worries.setCategoryFilter}
          onSelectWorry={worries.setSelectedId}
          onCompleteWorry={worries.completeWorry}
        />

        <WorryDetailPanel
          worry={worries.selectedWorry}
          onChangeStatus={(status) => {
            if (worries.selectedWorry) {
              worries.updateStatus(worries.selectedWorry.id, status);
            }
          }}
          onComplete={() => {
            if (worries.selectedWorry) {
              worries.completeWorry(worries.selectedWorry.id);
            }
          }}
          onDelete={() => {
            if (worries.selectedWorry) {
              worries.deleteWorry(worries.selectedWorry.id);
            }
          }}
        />
      </main>
    </div>
  );
}
