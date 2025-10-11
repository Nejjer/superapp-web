import { Theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Drawer } from './components/Drawer';
import { Provider } from './components/ui/provider';
import { Toaster } from './components/ui/toaster';
import { MobxStoreProvider } from './stores';
import { Compumon } from './views/Compumon';
import { EuroDollars } from './views/EuroDollars/EuroDollars';
import { RetroWeek } from './views/RetroWeek/RetroWeek';
import { WLED } from './views/WLED';

function App() {
  return (
    <MobxStoreProvider>
      <Provider>
        <Theme>
          <BrowserRouter basename='/app'>
            <Drawer />
            <Routes>
              <Route path='/' element={<Compumon />} />
              <Route path='/retro' element={<RetroWeek />} />
              <Route path='/EuroDollars' element={<EuroDollars />} />
              <Route path='/WLED' element={<WLED />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </Theme>
      </Provider>
    </MobxStoreProvider>
  );
}

export default App;
