import { GuidedRetrievalAnswerEditor, GUIDED_RETRIEVAL_PARTIAL_PREFIX } from "@/features/session/GuidedRetrievalAnswerEditor";
import {
  AbittiAnswerEditor as BaseAbittiAnswerEditor,
  answerHasContent as baseAnswerHasContent,
} from "./AbittiAnswerEditorBase";

export { answerPlainText } from "./AbittiAnswerEditorBase";

// Compatibility adapter: the original editor implementation still owns the
// Abitti Ctrl+E / ctrlKey keyboard flow and the visible Kaava control. Only the
// guided study-session retrieval field gets the question-bank experience.
export function answerHasContent(value: string) {
  if (value.startsWith(GUIDED_RETRIEVAL_PARTIAL_PREFIX)) return false;
  return baseAnswerHasContent(value);
}

type AbittiAnswerEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  autoFocus?: boolean;
  className?: string;
};

export function AbittiAnswerEditor(props: AbittiAnswerEditorProps) {
  if (props.label === "Vastaus muistista" && !props.disabled) {
    return <GuidedRetrievalAnswerEditor {...props} />;
  }
  return <BaseAbittiAnswerEditor {...props} />;
}
