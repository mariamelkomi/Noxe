import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Joi from "joi";
 function Register() {
    let [user , setUser] = useState({
        first_name:'',
        last_name:'',
        age:0,
        email:'',
        password:''
    });
    const [isLoading , setIsLoading] = useState(false);
    const[errorList ,setEroorList ] = useState([])
    let navegator = useNavigate();
    const [error ,setError] = useState('');
   
    function userFormData(e){
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        console.log(myUser)
    }
    async function submit(e){
        e.preventDefault();
        setIsLoading(true);
        let valid = valdition(); 
        if(valid.error){
           setEroorList(valid.error.details)
           setIsLoading(false);

        }
        else {
            let {data} = await axios.post('https://route-movies-api.vercel.app/signup', user) 
            console.log(data)
            if(data.message === 'success'){
            setIsLoading(false);
             navegator('/login')
     
            }
            else{
             setError(data.message);
             setIsLoading(false);

            }
        }
       
    }
    function valdition (){
        let scheme = Joi.object({
            first_name:Joi.string().min(3).max(10).required(),
            last_name:Joi.string().min(3).max(10).required(),
            age:Joi.number(),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
        return scheme.validate(user, {abortEarly:false})
    }
    return ( <>
    <div className="w-75 m-auto p-4">
        <h2>Register Now! </h2>
        {errorList.map((e , i)=> i === 1?<div className="alert alert-danger">Invalid password</div> : <div className="alert alert-danger">{e.message}</div>)}
        {error.length > 0 ? <div className="alert alert-danger">{error}</div>:''}
        <form onSubmit={submit}>
            <label htmlFor="first_name">first_name :</label>
            <input onChange={userFormData} type="text" className="bg-transparent mb-2 form-control" id="first_name" name="first_name" />

            <label htmlFor="last_name">last_name :</label>
            <input onChange={userFormData} type="text"  className=" mb-2 bg-transparent form-control" id="last_name" name="last_name" />

            <label htmlFor="age">age :</label>
            <input  onChange={userFormData} type="number"  className="mb-2 bg-transparent form-control" id="age" name="age" />

            <label htmlFor="email">email :</label>
            <input onChange={userFormData} type="email"   className="mb-2 bg-transparent form-control" id="email" name="email" />

            <label htmlFor="password">password :</label>
            <input onChange={userFormData}  type="password"  className="mb-2 bg-transparent form-control" id="password" name="password" />

            <button type="submit" className=" btn btn-outline-info">
            {isLoading === true? <i className="fas fa-spinner fa-spin"></i>:'Register'}
            </button>
            
        </form>
    </div>
    </> );
}

export default Register;