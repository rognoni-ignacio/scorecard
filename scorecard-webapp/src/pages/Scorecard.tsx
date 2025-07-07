import { useAppState } from "../context/useAppState";

export default function Scorecard() {
  const { holes } = useAppState();

  return (
    <div>
      <h1>Scorecard</h1>
      <p>Number of holes: {holes}</p>
    </div>
  );
}
