import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ErrorBoundary } from './components'
import './tailwind.css'    // Tailwind CSS utilities
import './index.css'       // Custom app styles
import './components.css'  // New component styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary message="Something went wrong with the app. Please refresh the page.">
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
