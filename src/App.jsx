import { Component, useEffect, useState } from "react";
import { Route ,Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import People from "./components/people/People";
import Register from "./components/Register/Register";
import Nav from "./components/Nav/Nav";
import Movies from "./components/movies/Movies";
import Tv from "./components/Tv/Tv";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import jwtDecode from "jwt-decode";
import Notfound from "./components/notfoud/Notfound";
import { Navigate , useNavigate } from "react-router-dom";
import Details from "./components/details/Details";
export function App()
{
  let x = useNavigate();
  const[userData , setUserData] = useState(null);
  function saveData(){
  let c = localStorage.getItem('userToken');
  let d = jwtDecode(c);
  setUserData(d);
  console.log(d);

  }
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveData();
    }
  } , [])
   function logOut(props){
    setUserData(null);
    localStorage.removeItem('userToken');
    x('/login');
   }
  function ProtectedRoute(props){
    if(localStorage.getItem('userToken') == null)
    {
      return <Navigate to='/login'/>

    }
    else
    {
      return props.children

    }
  }
 
   return <>
   <Nav logout = {logOut} userData={userData}/>
     <div className="container">
       <Routes>
       <Route path="" element = {<ProtectedRoute> <Home/></ProtectedRoute>}/>
       <Route path="home" element = {<ProtectedRoute> <Home/></ProtectedRoute>}/>
       <Route path="movies" element = {<ProtectedRoute> <Movies/></ProtectedRoute>}/>
       <Route path="people" element = {<ProtectedRoute> <People/></ProtectedRoute>}/>
       <Route path="moviedetails" element = {<ProtectedRoute> <Details/></ProtectedRoute>}>
         <Route path=":id" element = {<ProtectedRoute> <Details/></ProtectedRoute>}/>
       </Route>
       <Route path="tv" element = {<ProtectedRoute><Tv/></ProtectedRoute>}/>
       <Route path="signup" element = {<Register/>}/>
       <Route path="login" element = {<Login saveData = {saveData}/>}/>
       <Route path="*" element = {<Notfound/>}/>
      </Routes>
     
        
   </div>
   <div className="line">
   </div>
   <Footer/>
   </> 
 

}