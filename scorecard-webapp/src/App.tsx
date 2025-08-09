import { Routes, Route } from "react-router";
import Scorecard from "./pages/Scorecard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/play" element={<RequireAuth><Scorecard /></RequireAuth>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
