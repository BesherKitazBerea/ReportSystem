import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// My File Imports
import ReportDetails from './components/ReportDetails.jsx';
import MainView from './components/MainView.jsx';
import MapComponent from './components/MapComponent.jsx';
import ReportForm from './components/ReportForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import { Link, useNavigate, Navigate } from "react-router-dom";

// Authentication
import ProtectedView from './ProtectedView.jsx';
import { useAuth, AuthProvider  } from "./AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**  
   * Returns a Router component to navigate through the app
  */
 

  return (
    
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/map" element={<MapComponent />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/" element={ 
              <ProtectedView>
                  <MainView />
               </ProtectedView>} />
            <Route path="/report_details" element={<ReportDetails />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router> 
      </AuthProvider>
    </>
  )
}

export default App
