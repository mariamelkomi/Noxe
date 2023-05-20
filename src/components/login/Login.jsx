import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

 function Login(props) {
    let [user , setUser] = useState({
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
            let {data} = await axios.post('https://route-movies-api.vercel.app/signin', user) 
            console.log(data)
            if(data.message === 'success'){
            setIsLoading(false);
            localStorage.setItem('userToken' , data.token);
            props.saveData();
             navegator('/home')
     
            }
            else{
             setError(data.message);
             setIsLoading(false);

            }
        }
       
    }

    function valdition (){
        let scheme = Joi.object({
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
        return scheme.validate(user, {abortEarly:false})
    }
    return ( <>
    <div className="w-75 m-auto p-4">
        <h2>Login Now! </h2>
        {errorList.map((e,i)=> i === 1?<div className="alert alert-danger">Invalid password</div> : <div className="alert alert-danger">{e.message}</div>)}
        {error.length > 0 ? <div className="alert alert-danger">{error}</div>:''}
        <form onSubmit={submit}>
            <label htmlFor="email">email :</label>
            <input onChange={userFormData} type="email"   className="mb-2 bg-transparent form-control" id="email" name="email" />

            <label htmlFor="password">password :</label>
            <input onChange={userFormData}  type="password"  className="mb-2 bg-transparent form-control" id="password" name="password" />

            <button type="submit" className=" btn btn-outline-info">
            {isLoading === true? <i className="fas fa-spinner fa-spin"></i>:'Login'}
            </button>
            
        </form>
    </div>
    </> );
}

export default Login;