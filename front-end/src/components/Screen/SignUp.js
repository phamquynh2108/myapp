import React, { useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const SignUp = () => {
    const history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const postData = () =>{
        fetch('http://localhost:3001/auths/signup',{
            method:'post',
            credentials:'include',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                name:name,
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
                M.toast({html:data.message,classes:"#00bfa5 teal accent-4"})
                history.push("/signin");
            }
        })
        .catch((error)=>{
            M.toast({html:error, classes:"#c62828 red darken-3"})
            
        })
    }
        return (

            <div>
                <div>
                <div className="mycard">
                    <div className="card auth-card">
                        <h2>Instagram</h2>
                        <input type="text" 
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                        <input type="text"
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <input type="password" placeholder="Password"
                         value={password}
                         onChange={(e)=>{setPassword(e.target.value)}} 
                        />
                        <button type="submit" className="btn waves-effect waves-light btns"
                        onClick ={()=>postData()}
                        >Sign up</button>
                        <h5><Link to="/signin">Already have an account?</Link></h5>
                    </div>
                </div>
            </div>
            </div>
        );
}

export default SignUp;