import "./assets/main.css"
import App from './App'
import { ThemeProvider } from './theme/ThemeContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./i18n"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
