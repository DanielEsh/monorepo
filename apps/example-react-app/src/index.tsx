import React from 'react';
import { createRoot } from 'react-dom/client';
import {ExampleComponent} from "./example-component";
import {ModulesComponent} from "./modules-component";

// Функциональный компонент App
const App = () => {
    return (
        <div>
            <h1>Hello World2</h1>
            <ExampleComponent />
            <ModulesComponent />
        </div>
    );
};

// Монтируем React в #root
const container = document.getElementById('root');
if (!container) {
    throw new Error('Cannot find element with id "root"');
}
const root = createRoot(container);  // React 18 API :contentReference[oaicite:2]{index=2}
root.render(<App />);