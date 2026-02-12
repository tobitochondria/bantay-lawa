import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppPage from './pages/App.jsx'

createInertiaApp({
  // Ignore the page name and always render the single page component
  resolve: () => AppPage,
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
