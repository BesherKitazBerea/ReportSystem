
import { useLocation, useNavigate  } from "react-router-dom";
import '../css/reportDetail.css';
import { useState, useEffect } from "react";



const ReportForm = () => {

      // one state for every field
/*     const [formState, setFormState] = useState({
      address: "",
      description: "",
    })


    const getHandler = (key) => (val) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: val,
      }));
    }; */


  // Seperate states for different fields
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")

    const [emptyAddress, setEmptyAddress] = useState(false)
    const [invalidAddress, setInValidAddress] = useState(false)

    const [emptyDesc, setEmptyDesc] = useState(false)
    const [invalidDesc, setInvalidDesc] = useState(false)
    
    const location = useLocation();
    const { lat, lng } = location.state || {};

    const navigate = useNavigate();

    function backToMap() {
      navigate('/map',); 
    }
    
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    }

    const validateData = () => {
      let valid = true
      if (!address) {
        setEmptyAddress(true) 
        valid = false
      }
      else setEmptyAddress(false) 

      if (!description) {
        setEmptyDesc(true) 
        valid = false
      }
      else setEmptyDesc(false) 
    }

    const submitDemo = () => {

      let valid = validateData();
        if (valid) {
        console.log("Address:", address);
        console.log("Description:", description);
      }
    }

    // Sending the data to the API endpoint
    const handleSubmit = async (event) => {
      const url = 'http://localhost:8000/api/coordinates/';  // Django API endpoint
      const data = {
        lat: lat,
        lng: lng,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',  // Method: POST for submitting data
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers here, like authorization tokens
          },
          body: JSON.stringify(data),  // Convert the data to JSON format
        });
    
        const result = await response.json();  // Get the response data
        console.log('Response from Django API:', result);
      } catch (error) {
        console.error('Error submitting data to Django API:', error);
      }
      navigate('/',);

    };
    


    return (

      <div className="report-form">

          
          <p>Selected Location: {lat} {lng} </p>
          <input 
              type="text" 
              placeholder="type address" 
              value = {address}
              onChange={handleAddressChange}
              required
              />
            {emptyAddress && <div> *This field is required </div> }

          <textarea 
                placeholder="Description of the problem"
                value={description}
                onChange={handleDescriptionChange}
                required
          ></textarea>
            {emptyDesc && <div> *This field is required </div> }


          <div className="buttons">
            <button type="submit" onClick={submitDemo}> Submit Demo </button> 
            <button  onClick={backToMap}> Back </button> 
            <button type="submit" onClick={handleSubmit}> Submit! </button> 
          </div>

      </div>

    );
}


export default ReportForm

