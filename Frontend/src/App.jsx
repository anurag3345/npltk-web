import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import DocsLayout from './layouts/DocsLayout'
import HomePage        from './pages/HomePage'
import DocsPage        from './pages/DocsPage'
import PlaygroundPage  from './pages/PlaygroundPage'
import OpenSourcePage  from './pages/OpenSourcePage'
import TeamPage        from './pages/TeamPage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/"            element={<HomePage />} />
        <Route path="/playground"  element={<PlaygroundPage />} />
        <Route path="/opensource"  element={<OpenSourcePage />} />
        <Route path="/team"        element={<TeamPage />} />
      </Route>

      {/* Docs gets its own layout with sidebar */}
      <Route path="/docs" element={<DocsLayout />}>
        <Route index element={<DocsPage />} />
      </Route>
    </Routes>
  )
}
