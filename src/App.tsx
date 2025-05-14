import { BrowserRouter, Route, Routes } from "react-router";
import { Compumon } from "./views/Compumon";
import { RetroWeek } from "./views/RetroWeek/RetroWeek";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";

function App() {

  return (
    <Provider>
      <BrowserRouter basename="/mon">
        <Routes>
          <Route path="/" element={<Compumon />} />
          <Route path="/retro" element={<RetroWeek />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
