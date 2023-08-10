// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import '@fortawesome/fontawesome-free/css/all.min.css';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    ,
)
