const feedbackFormUrl = import.meta.env.VITE_FEEDBACK_FORM_URL;

export function useFeedbackForm(onMissingUrl: () => void) {
  return () => {
    if (feedbackFormUrl) {
      window.open(feedbackFormUrl, "_blank", "noopener,noreferrer");
      return;
    }

    onMissingUrl();
  };
}
