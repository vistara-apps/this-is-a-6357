import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import GalleryBuilder from './pages/GalleryBuilder'
import GalleryView from './pages/GalleryView'
import Templates from './pages/Templates'
import Settings from './pages/Settings'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700">
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="gallery/:id" element={<GalleryView />} />
            <Route path="gallery/:id/edit" element={<GalleryBuilder />} />
            <Route path="create" element={<GalleryBuilder />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </AppProvider>
  )
}

export default App