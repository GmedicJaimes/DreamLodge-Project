import React from 'react'
//import ReactDOM from 'react-dom';  // Corregir la importación aquí
import ReactDOM from 'react-dom/client' 
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import { DateProvider } from '../src/Contex/DateContex.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";



import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <DateProvider>
        <CssBaseline>
          <App />
          </CssBaseline>
        </DateProvider>
        </BrowserRouter>
      </QueryClientProvider>
    
)
