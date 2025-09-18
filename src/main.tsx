import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import {router} from "./router";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript />
    <MantineProvider>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </MantineProvider>
  </React.StrictMode>
)
