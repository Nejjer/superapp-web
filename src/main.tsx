// Основные JS полифилы
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// structuredClone полифил
import polyfillStructuredClone from '@ungap/structured-clone';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

// Подменяем глобально, если браузер старый
if (typeof structuredClone === 'undefined') {
  (window as any).structuredClone = polyfillStructuredClone;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
