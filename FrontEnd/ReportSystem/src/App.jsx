import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// My File Imports
import ReportDetails from './components/ReportDetails.jsx';
import MainView from './components/MainView.jsx';
import MapComponent from './components/MapComponent.jsx';
import ReportForm from './components/ReportForm.jsx';
import LoginForm from './components/LoginForm.jsx';
function App() {
  /**  
   * Returns a Router component to navigate through the app
  */
 
  if (!isLoggedIn) {
    // Redirect to login page if the user is not logged in
    return <Navigate to="/login" replace />;
  }
  return (
    
    <>
    <Router>
      <Routes>
        <Route path="/map" element={<MapComponent />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/" element={<MainView />} />
        <Route path="/report_details" element={<ReportDetails />} />
        <Route path="/login" element={<LoginForm />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
