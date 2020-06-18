import React, { useContext } from 'react';
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from './App';
const Navbar = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
        if(state){
            return(
                <div>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/create">Create post</Link></li>
                <li><Link to="/mysubcribers">My following posts</Link></li>
                <li>
                <button type="submit" className="btn waves-effect waves-light" style={{backgroundColor:" #f44336"}} onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push("/signin")
                }}>Sign out</button>
                </li>
                </div>
            );
        }else{
            return(
                <div>
                <li><Link to="/signin">Sign in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
                </div>
            )
        }
    }
        return (
            
                 <nav>
                    <div className="nav-wrapper white">
                    <Link to={state ?"/home":"/signin"} className="brand-logo left" style={{marginLeft:"40px"}}>Instagram</Link>
                    <ul id="nav-mobile" className="right">
                        {renderList()}
                    </ul>
                    </div>
                </nav>
            
        );
}


export default Navbar;