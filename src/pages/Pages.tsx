import { Route, Routes, useLocation } from "react-router-dom";
import Game from "./game/Game";
import Menu from "./menu/Menu";

function Pages() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Menu />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default Pages;
