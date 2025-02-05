import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/loginForm.css'
 
import { useAuth } from '..//AuthContext';


function LoginForm() {
    const [nameData, setNameData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [somethingWrong, setSomethingWrong] = useState(false);

    // Contexts
    const navigate = useNavigate();
    const { user, login, logout } = useAuth(); // Access context values

    function handleUsernameChange(e) {
        setNameData(e.target.value)
    }

    function handlePasswordChange(e) {
        setPasswordData(e.target.value)
    }

    const handleSubmit = async (e) => {        
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: nameData,
                    password: passwordData,
                }),
            });
            
            if (response.ok) {
                // localStorage.setItem('token', response.headers.get('Authorization'));
                console.log("It worked!");
                const userData = await response.json(); 
                login(response)
                navigate('/');
            } else {
                setSomethingWrong(true);
            }
        }
        catch (error) {
            setSomethingWrong(true);
            console.error('Error:', error);
        }
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={nameData}
                        onChange={handleUsernameChange}
                        required />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={passwordData}
                        onChange={handlePasswordChange}
                        required />
                </label>
                <input type="submit" value="sign in" />
                {somethingWrong && <p> Something went wrong, please try again! </p>}
            </form>
        
        <Link to={'/password-reset'}> Forgot Password? </Link>
        <Link to={'/password-reset'}> Don't have an account? Create an account for free </Link>

        </div>

    );
}

export default LoginForm;