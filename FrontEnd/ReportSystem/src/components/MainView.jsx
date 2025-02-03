 /**  
  * Author: Besher Kitaz
  * This file is the main view of the app, where it shows all reports, and a link to create a new report
*/ 

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Navigate } from "react-router-dom";

import '../css/mainView.css'


function MainView() {

    // Hooks
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const handleData = async (event) => {
        /**  
         * Gets the data (report title and description, and coordinates) for all reports 
         * */ 
        const url = 'http://localhost:8000/api/reports/'

        const response = await fetch(url, {
            method: 'GET',  // Method: POST for submitting data
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers here, like authorization tokens
            },            
        })    

        const data = await response.json();
        setReports(data.reports);
    }

    // Fetch data when the component mounts
    useEffect(() => {
        handleData()        
    }, []
    )

    // When the report is clicked, it will navigate to a new page with the report full details
    const handleReportClick = (reportId) => {        
        navigate(`/report_details?id=${reportId}`)
        
    };

    return (
        <> 
            <div>
                {reports.map((report, index) => (
                    <div key={report.id} id={report.id} className='report' onClick={() => handleReportClick(report.id)}> 
                        <div>Address: {report.address}</div>
                        <div> Lat: {index} {report.lat} </div>
                        <div> Long: {index} {report.lng} </div>
                    </div>
                ))}
            </div>
            <div>
                <Link to={'/map'} > Report a problem </Link>            
            </div>
        </>
    )
}


export default MainView;

