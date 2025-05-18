import { BrowserRouter, Route, Routes } from "react-router";
import { Compumon } from "./views/Compumon";
import { RetroWeek } from "./views/RetroWeek/RetroWeek";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import { Theme } from "@chakra-ui/react";
import { Drawer } from "./components/Drawer";

function App() {

  return (
    <Provider>
      <Theme >
        <BrowserRouter basename="/app">
          <Drawer />
          <Routes>
            <Route path="/" element={<Compumon />} />
            <Route path="/retro" element={<RetroWeek />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Theme>
    </Provider>
  );
}

export default App;
