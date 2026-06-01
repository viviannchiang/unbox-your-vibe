// Single result URL (/result) — the figure is resolved client-side from
// sessionStorage, so a specific result can never be deep-linked or shared.

import { ResultView } from "@/components/result/ResultView";

export default function ResultPage() {
  return <ResultView />;
}
