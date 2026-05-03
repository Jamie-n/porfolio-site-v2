import Flowchart, { AI_LOOP_FLOWCHART_PRESET } from "./Flowchart";

type AiLoopFlowchartProps = {
  title?: string;
};

/**
 * Journey / styleguide preset: plan → execute → test → refine loop.
 * For other diagrams, use {@link Flowchart} with your own `steps` and `summaryRow`.
 */
export default function AiLoopFlowchart({
  title = "AI workflow loop",
}: AiLoopFlowchartProps) {
  return <Flowchart {...AI_LOOP_FLOWCHART_PRESET} title={title} />;
}
