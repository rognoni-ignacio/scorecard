import { useState } from "react";
import "./App.css";

function App() {
  const [holes, setHoles] = useState<number>(18);

  return (
    <div>
      <h1>Golf Scorecard</h1>
      <div>
        <h2>How many holes are you playing today?</h2>

        <div>
          <button onClick={() => setHoles(9)}>9 holes</button>
          <button onClick={() => setHoles(18)}>18 holes</button>
        </div>

        <p>Great! You are playing {holes} holes today.</p>

      </div>
      <button>Start Game</button>
    </div>
  );
}

export default App;
