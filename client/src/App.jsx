import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import { Route,Routes, useLocation } from 'react-router-dom'
import AuthPage from "./pages/AuthPage"
import SecurityDashboardPage from "./pages/SecurityDashboard/SecurityDashboardPage"
import Agent from "./pages/Agent/AgentsPage"


function App() {

  const location = useLocation();
  const hideLayout = ['/dashboard'].includes(location.pathname);

  return (
    <div className='App'>

      {!hideLayout && <Navbar/>}

      <Routes>
        <Route path='' element={<LandingPage/>} />
        <Route path='/login' element={<AuthPage/>} />
        <Route path='/dashboard' element={<SecurityDashboardPage/>} />
        <Route path='/agent' element={<Agent/>} />
        
      </Routes>
      

      {!hideLayout && <Footer/>}

    </div>
  )
}

export default App
