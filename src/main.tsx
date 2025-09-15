import React from 'react'
import { RouterProvider } from 'react-router'

import { createRoot } from 'react-dom/client'

import { Provider } from './app/Provider'
import { router } from './router'
import './index.css'

const root = createRoot(document.getElementById('root') || document.body)

root.render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)