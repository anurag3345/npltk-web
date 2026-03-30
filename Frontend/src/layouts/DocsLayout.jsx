import { Outlet } from 'react-router-dom'
import Navbar   from '../components/Navbar'
import Sidebar  from '../components/Sidebar'
import Footer   from '../components/Footer'

export default function DocsLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
