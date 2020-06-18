import React , { useState, useEffect, useContext} from 'react';
import { UserContext } from './../App';
const Profile = ()=>{
    const [myPost, setMyPost] = useState([])
    const {state, disptach}= useContext(UserContext)
    useEffect (()=>{
        fetch('http://localhost:3001/posts/mypost',{
            method:'get',
            headers:{
                'x-access-token':localStorage.getItem('jwt')},
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.mypost); 
            setMyPost(data.mypost) 
        })
    },[])


    return (
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
                    <h4>{state?state.name:"loading"}</h4>
                    <ul style={{display:"flex", justifyContent:"space-between"}}>
                        <li>{myPost.length} posts</li>
                        <li>{state?state.followers.length:"0"} followers</li>
                        <li>{state?state.following.length:"0"} followings</li>
                    </ul>

                </div>
            </div>
            <div className="gallery">
            {
                myPost.map((item,key)=>{
                    return (
                        <img className="item" src={item.imageUrl} alt={item.title} key ={key} />
                    )
                    
                })
            }
            </div>
        </div>
    );
    
}

export default Profile;