

import React, {useEffect, useState} from "react";
import { useLocation, Link } from "react-router-dom";

function reportDetails() {

    // Manage the state of the report data
    const [report, setReport] = useState("");

    // Get the report Id from the URL to fetch
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const reportId = queryParams.get('id');

    const url = `http://localhost:8000/api/report_details/${reportId}`;  // Django API endpoint

    const handleData = async () => {
        const response = await fetch(url, {
            method: 'GET',  // Method: POST for submitting data
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers here, like authorization tokens
            },            
            content: {
                report_id: reportId,
            },
            
        })

        const data = await response.json();
        setReport(data.report); 
        console.log(data.report);
    }   

    useEffect(() => {
        handleData()        
    }, []
    )

    return (
        <div>
            <h2>Lat: {report.lat}</h2>
            <h2>Lng: {report.lng}</h2>
            <Link to={"/"}> Back </Link>
        </div>
    );
}

export default reportDetails;