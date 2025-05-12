import { BrowserRouter, Route, Routes } from "react-router";
import { Compumon } from "./views/Compumon";
import { RetroWeek } from "./views/RetroWeek";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Compumon />} />
        <Route path="/" element={<RetroWeek />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
