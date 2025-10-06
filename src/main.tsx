import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import {router} from "./router";
import {SwrProvider} from "./lib/plugin/swr.provider.tsx";
import {ApiProvider} from "./lib/plugin/auth-provider/api-provider.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript />
      <ApiProvider>
        <MantineProvider>
            <SwrProvider>
                <RouterProvider router={router} />
            </SwrProvider>
        </MantineProvider>
      </ApiProvider>
  </React.StrictMode>
)
