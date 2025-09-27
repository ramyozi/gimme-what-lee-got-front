import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import {router} from "./router";
import {SwrProvider} from "./lib/plugin/swr.provider.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript />
    <MantineProvider>
        <SwrProvider>
            <RouterProvider router={router} />
        </SwrProvider>
    </MantineProvider>
  </React.StrictMode>
)
