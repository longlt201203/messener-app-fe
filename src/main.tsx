import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { ThemeProvider } from 'styled-components'
import theme from './theme.ts'
import AuthProvider from './components/AuthProvider.tsx'
import SocketProvider from './components/SocketProvider.tsx'
import { io } from 'socket.io-client'

const socket = io("ws://26.123.114.212:9000", { autoConnect: false });

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AuthProvider>
      <SocketProvider socket={socket}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SocketProvider>
    </AuthProvider>
  // </React.StrictMode>,
)
