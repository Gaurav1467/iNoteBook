import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Alert from './Alert';

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoader(true);
        const respone = await fetch(`https://i-note-book-backend-psi.vercel.app/api/auth/login`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });

        const json = await respone.json();

        setLoader(false);

        if (json.success) {
            props.showAlert("Logged in Successfully", "success")
            localStorage.setItem('token' , json.authToken)
            navigate("/");
            
        }
        else {
           props.showAlert(json.error, "danger")
        }


    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='container centre-d'>
            {loader ? <div className="loader">Loading...</div> : <form onSubmit={handleSubmit}>
                <div className="mb-3 " >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control input-style" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" value={credentials.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  onChange={onChange} className="form-control input-style" name="password" id="password" value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>}
        </div>
    )
}

export default Login