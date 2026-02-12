import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })

createInertiaApp({
  resolve: (name) => {
    const page = pages[`./pages/${name}.jsx`]

    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }

    return page.default
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
