// FR-03, FR-32, NFR-01 | UML: UC_Browse, UC_Login and the web application boundary.
import { createRoot } from 'react-dom/client';
import { App } from './app';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(<App />);
}
