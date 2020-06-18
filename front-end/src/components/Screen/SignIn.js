import React, {useState, useContext } from 'react';//lay dl trong store:useContext
import { Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App'
import M from 'materialize-css'
const SignIn = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const postData = () =>{
        fetch('http://localhost:3001/auths/signin',{
            method:'post',
            credentials:'include',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            //console.log(data); 
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }else{

                window.localStorage.setItem('jwt',data.accessToken)
                window.localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"Login success",classes:"#00bfa5 teal accent-4"})
                history.push("/home");
            }
        })
        .catch((error)=>{
            M.toast({html:error, classes:"#c62828 red darken-3"})
            
        })
    }

        return (
            <div>
                <div className="mycard">
                    <div className="card auth-card">
                        <h2>Instagram</h2>
                        <input type="text" placeholder="Email" 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <input type="password" placeholder="Password" 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <button type="submit" className="btn waves-effect waves-light btns" onClick={()=>postData()}>Sign in</button>
                        <h5><Link to="/signup">Don't have an account?</Link></h5>
                    </div>
                </div>
            </div>
        );
    
}

export default SignIn;