import { Routes, Route } from "react-router";
import Scorecard from "./pages/Scorecard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Scorecard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
