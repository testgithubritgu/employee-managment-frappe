import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FrappeProvider } from 'frappe-react-sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './app-boundries/Error.tsx'
import { ClerkProvider } from "@clerk/clerk-react"
import { TooltipProvider } from './components/ui/tooltip.tsx'
const queryClient = new QueryClient()

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>


    <BrowserRouter>
      <FrappeProvider>
        <QueryClientProvider client={queryClient}>
  <TooltipProvider>

          <App />
  </TooltipProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </FrappeProvider>
    </BrowserRouter>
  </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>,
)
