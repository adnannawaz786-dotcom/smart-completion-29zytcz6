import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import DocumentEditor from './pages/DocumentEditor'
import Settings from './pages/Settings'
import { cn } from './lib/utils'

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <Router>
        <div className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "transition-colors duration-300"
        )}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/document/:id" element={<DocumentEditor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster
            position="bottom-right"
            expand={false}
            richColors
            closeButton
            theme="system"
          />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App