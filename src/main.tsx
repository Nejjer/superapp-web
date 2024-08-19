import ReactDOM from 'react-dom/client';
import App from './App.tsx';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.ts');
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
