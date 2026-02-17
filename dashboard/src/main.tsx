import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FrappeProvider } from 'frappe-react-sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FrappeProvider>
        <QueryClientProvider client={queryClient}>

          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </FrappeProvider>
    </BrowserRouter>
  </StrictMode>,
)
