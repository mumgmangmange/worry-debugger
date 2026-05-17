import { ExternalLink, MessageSquareText, X } from "lucide-react";

const feedbackFormUrl = import.meta.env.VITE_FEEDBACK_FORM_URL;

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

export function FeedbackDialog({ open, onClose }: FeedbackDialogProps) {
  if (!open) {
    return null;
  }

  const openFeedbackForm = () => {
    if (!feedbackFormUrl) {
      return;
    }

    window.open(feedbackFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#2D6A4F]">문의/개선사항</p>
            <h2 id="feedback-title" className="mt-1 text-xl font-extrabold">
              Google Form으로 접수
            </h2>
          </div>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            onClick={onClose}
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <MessageSquareText size={17} />
            문의 내용을 폼에 남겨주세요.
          </div>
          <p className="mt-2">제출된 내용은 Google Form 응답으로 저장됩니다.</p>
        </div>

        {!feedbackFormUrl && (
          <p className="mt-4 rounded-lg border border-[#F5E5BA] bg-[#FFF8E8] p-3 text-sm font-bold text-[#7C5B24]">
            .env.local에 VITE_FEEDBACK_FORM_URL을 입력해주세요.
          </p>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" className="toolbar-button justify-center" onClick={onClose}>
            닫기
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            onClick={openFeedbackForm}
            disabled={!feedbackFormUrl}
          >
            <ExternalLink size={17} />
            문의 폼 열기
          </button>
        </div>
      </div>
    </div>
  );
}
