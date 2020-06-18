import React , {useEffect , createContext, useReducer, useContext }from 'react';
import '../App.css';
import Navbar from './Navbar';
import {BrowserRouter as Router,Route,Switch,useHistory} from 'react-router-dom'
import Profile from './Screen/Profile';
import Home from './Screen/Home';
import SignUp from './Screen/SignUp';
import SignIn from './Screen/SignIn';
import CreatePost from './Screen/CreatePost';
import UserProfile from './Screen/UserProfile';
import SubcribesUser from './Screen/SubcribesUser';
import { initialState ,reducer} from './reducer/userReducer';
export const UserContext = createContext()//create : provider and consumer

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    // console.log(user);
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/home')
    }else{
      history.push("/signin");
    }
    
  },[])
  return(
    <Switch>
      <Route path ='/home' component= {Home}/>
        <Route path ='/signin' component= {SignIn}/>
        <Route path ='/signup' component= {SignUp}/>
        <Route path ='/create' component= {CreatePost}/>
        <Route exact path ='/profile' component= {Profile}/>
        <Route path ='/profile/:userid' component= {UserProfile}/>
        <Route path ='/mysubcribers' component={SubcribesUser} />
    </Switch>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>
        <Router>
          <Navbar/>
          <Routing />
        </Router>
      </UserContext.Provider>

    </div>
  );
}

export default App;
