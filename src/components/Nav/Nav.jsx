import { Link } from 'react-router-dom'
import React from 'react';
function Nav (props) {
    return ( <>
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bold" to="home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       {props.userData? <>
        <li className="nav-item">
          <Link className="nav-link" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tv">Tv</Link>
        </li>

       </>:''}
        
      </ul>
      <ul className="navbar-nav  mb-2 mb-lg-0">
      <li className='nav-item  order-lg-first order-last d-flex align-items-center'>
      <i className='text-white fab fa-facebook m-1'></i>
      <i className='text-white fab fa-twitter m-1'></i>
      <i className='text-white fab fa-instagram m-1'></i>

      </li>
      {props.userData?<li className="nav-item order-lg-last order-first">
         <span onClick={props.logout} className="nav-link" to="logout">Logout</span>
       </li>:<>
       <li className="nav-item order-lg-last order-first">
         <Link className="nav-link" to="signup">SignUp</Link>
       </li>
       <li className="nav-item order-lg-last order-first">
         <Link className="nav-link" to="login">Login</Link>
       </li>
       </>}
       
       
      </ul>
    </div>
  </div>
</nav></div>
    </> );
}

export default Nav ;