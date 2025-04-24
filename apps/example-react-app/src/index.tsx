import React from 'react';
import { createRoot } from 'react-dom/client';
import {ExampleComponent} from "./example-component";
import {ModulesComponent} from "./modules-component";
import {LessPlainComponent} from "./less-plain-component";
import {LessModuleComponent} from "./less-module-component";
import {ScssPlainComponent} from "./scss-plain-component";
import {ScssModuleComponent} from "./scss-module-component";

// Функциональный компонент App
const App = () => {
    return (
        <div>
            <h1>Hello World2</h1>
            <ExampleComponent />
            <ModulesComponent />
            <LessPlainComponent />
            <LessModuleComponent />
            <ScssPlainComponent />
            <ScssModuleComponent />
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