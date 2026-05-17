import { useRef, useState } from "react";
import { AppFooter } from "./features/worries/components/AppFooter";
import { AppHeader } from "./features/worries/components/AppHeader";
import { FeedbackDialog } from "./features/worries/components/FeedbackDialog";
import { WorryBoard } from "./features/worries/components/WorryBoard";
import { WorryDetailPanel } from "./features/worries/components/WorryDetailPanel";
import { WorrySidebar } from "./features/worries/components/WorrySidebar";
import { useFeedbackForm } from "./hooks/useFeedbackForm";
import { useWorries } from "./hooks/useWorries";

export default function WorryDebuggerApp() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const worries = useWorries();
  const openFeedback = useFeedbackForm(() => setFeedbackOpen(true));

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F1EA] text-slate-900">
      <AppHeader
        fileInputRef={fileInputRef}
        onGoHome={worries.goHome}
        onExport={worries.exportBackup}
        onImport={worries.importBackupFile}
        onResetDemo={worries.resetDemo}
        onOpenFeedback={openFeedback}
      />

      <main className="mx-auto grid w-full max-w-[1600px] flex-1 gap-5 px-5 py-6 lg:grid-cols-[320px_minmax(0,1fr)_300px] lg:px-8">
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
          onChangeStatus={worries.updateSelectedStatus}
          onComplete={worries.completeSelectedWorry}
          onDelete={worries.deleteSelectedWorry}
        />
      </main>

      <AppFooter />
      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
