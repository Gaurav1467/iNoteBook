import React from 'react'

import {Link,useLocation} from 'react-router-dom'






function Navbar() {

  const handleLogout = ()=>{
    localStorage.removeItem('token');
  }
  let location = useLocation();

  return (
    <>
   <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className= {`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>
      {localStorage.getItem('token') ? <div className="d-flex" >
      <Link className="btn btn-outline-primary mx-1" to="/login" onClick={handleLogout} role="button">Sign Out</Link></div>  
      : <div className="d-flex" >
      <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Sign In</Link>
      <Link className="btn btn-outline-primary" to="/signup" role="button">Sign Up</Link>
      </div>}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar