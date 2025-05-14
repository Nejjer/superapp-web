import { BrowserRouter, Route, Routes } from "react-router";
import { Compumon } from "./views/Compumon";
import { RetroWeek } from "./views/RetroWeek/RetroWeek";
import { Provider } from "./components/ui/provider";

function App() {

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Compumon />} />
          <Route path="/retro" element={<RetroWeek />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
