import React,{ useState, useEffect, useContext} from 'react';
import { UserContext } from './../App';
import {useParams} from 'react-router-dom'
const Profile = ()=>{
    const [userProfile, setUserProfile] = useState(null)
   
    const {state, dispatch}= useContext(UserContext)
    const {userid} = useParams()
    const [showFollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid);
    
    useEffect (()=>{
        fetch(`http://localhost:3001/users/${userid}`,{
            method:'get',
            headers:{
                'x-access-token':localStorage.getItem('jwt')},
        })
        .then((res)=>res.json())
        .then((result)=>{
            //console.log(result); 
            setUserProfile(result) ;    
        })
    },[])

    const followUser = () =>{
        fetch(`http://localhost:3001/users/follow`,{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('jwt')},
            body:JSON.stringify({
                followId:userid
            })
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);   
            dispatch({type:'UPDATE', payload:{following:result.following,followers:result.followers}})
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({type:"USER", payload:result})
            setUserProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{...prevState.user,
                    followers:[...prevState.user.followers,result._id]}
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = () =>{
        fetch(`http://localhost:3001/users/unfollow`,{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('jwt')},
            body:JSON.stringify({
                followId:userid
            })
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);   
            dispatch({type:'UPDATE', payload:{following:result.following,followers:result.followers}})
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({type:"USER", payload:result})
            setUserProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item!== result._id)
                return{
                    ...prevState,
                    user:{...prevState.user,
                    followers:newFollower
                    }
                }
            })
            setShowFollow(true)
            
        })
    }

    return (
        <>
        {userProfile? 

            <div style={{maxWidth:"600px" , margin:"0px auto"}}>
            <div style={{ display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey",
                paddingBottom: "18px",
                }}>
                <div>
                    <img style ={{width:"160px", height:"160px",borderRadius:"50%", border:"1px solid #d8d8d8"}}
                    src ="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <ul style={{display:"flex", justifyContent:"space-between"}}>
                        <li>{userProfile.posts.length} posts</li>
                        <li>{userProfile.user.followers.length} followers</li>
                        <li>{userProfile.user.following.length} followings</li>
                    </ul>
                    {showFollow?
                       
                           <button type="submit" className="btn waves-effect waves-light btns" onClick={()=>followUser()}>Follow</button>
                            
                       :
                            <button type="submit" className="btn waves-effect waves-light btns" onClick={()=>unfollowUser()}>UnFollow</button>
                            
                    }
                    {/* {userProfile.user.followers.filter(item=>{
                        return (item.includes(state._id) ?
                            <button type="submit" className="btn waves-effect waves-light btns" onClick={()=>followUser()}>Follow</button>
                        :
                            <button type="submit" className="btn waves-effect waves-light btns" onClick={()=>unfollowUser()}>UnFollow</button>
                        )
                    })          
                    } */}
                </div>
            </div>
            <div className="gallery">
            {
                userProfile.posts.map((item,key)=>{
                    return (
                        <img className="item" src={item.imageUrl} alt={item.title} key ={key} />
                    )
                    
                })
            }
            </div>
            </div>

        : <h2>loading....!</h2>}
        
        </>
    );
    
}

export default Profile;