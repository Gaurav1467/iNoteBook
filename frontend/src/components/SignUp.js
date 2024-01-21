import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp(props) {

  const [credentials, setCredentials] = useState({name : "", email: "", password: "", cpassword : "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

      e.preventDefault();
      const {name, email, password} = credentials

     
      const respone = await fetch(`https://i-note-book-backend-psi.vercel.app/api/auth/createuser`, {

          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({name, email, password })

      });

      const json = await respone.json();
     

      if (json.success) {
          localStorage.setItem('token' , json.authToken)
          navigate("/");
          props.showAlert("Created Account Successfull","success");
          
      }
      else {
        props.showAlert(json.error,"danger")
      }


  }

  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container centre-d'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Full Name</label>
          <input type="text" className="form-control input-style" onChange={onChange} minLength={3} required id="name" name='name' />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control input-style" onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control input-style" onChange={onChange} minLength={8} required name='password' id="password" />
        </div>
        <button disabled = {credentials.name.length < 3 || credentials.password.length < 8  } type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp