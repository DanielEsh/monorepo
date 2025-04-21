import React from 'react';
import { createRoot } from 'react-dom/client';

// Функциональный компонент App
const App = () => {
    return <h1>Hello World2</h1>;
};

// Монтируем React в #root
const container = document.getElementById('root');
if (!container) {
    throw new Error('Cannot find element with id "root"');
}
const root = createRoot(container);  // React 18 API :contentReference[oaicite:2]{index=2}
root.render(<App />);