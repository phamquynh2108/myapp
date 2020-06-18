import React , {useState,useEffect,useContext} from 'react';
import { UserContext } from './../App';
import {Link} from 'react-router-dom'
const Home = () => {
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:3001/posts/allpost',{
            method:'get',
            credentials:'include',
            headers:{
                'x-access-token':localStorage.getItem('jwt')},
        })
        .then((res)=>res.json())
        .then((data)=>{
            //console.log(data.message);
            setData(data.message)    //set all post
        })
    },[])

const likepost = (id)=>{
    fetch('http://localhost:3001/posts/like',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "x-access-token":localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result);    
        const newData = data.map(item=>{
            if(item._id == result._id){
                return result
            }else{
                return item
            }
        }) 
        setData(newData)  
        
    })
    .catch(err=>{
        console.log(err);
        
    })
}

const unlikepost = (id)=>{
    fetch('http://localhost:3001/posts/unlike',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "x-access-token":localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id //postId: id cua bai viet
        })
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result); 
        const newData = data.map(item=>{
            if(item._id == result._id){
                return result
            }else{
                return item
            }
        }) 
        setData(newData)  
    })
    .catch(err=>{
        console.log(err);    
    })
}
const makeComment = (text,postId) =>{
    fetch('http://localhost:3001/posts/comment',{
        method:"PUT",
        credentials:'include',
        headers:{
            "Content-Type":"application/json",
            "x-access-token":localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            text:text,
            postId: postId, 
        })
    })
    .then(res=>res.json())
    .then(result=>{
        console.log((result));
        const newData = data.map(item=>{
            if(item._id == result._id){
                return result
            }else{
                return item
            }
        }) 
        setData(newData) 
    })
    .catch(err=>{
        console.log(err);    
    })
}
const deletePost=(postId)=>{
    fetch(`http://localhost:3001/posts/deletepost/${postId}`,{
        method:"DELETE",
        credentials:'include',
        headers:{
            "x-access-token":localStorage.getItem("jwt")
        },
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result);
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
        
    })
    .catch(err=>{
        console.log(err);    
    })
}
    return (
        
        
        <div className="home" >
            {
                data.map((item,key)=>{
                    return(
                        <div className="card home-card" key={key} >
                            <div className="card-info">
                                <img style ={{width:"50px", height:"50px",borderRadius:"50%", border:"1px solid #d8d8d8",display:"block", marginRight:"7px"}}
                                src={item.imageUrl} />
                                <h5 style={{display:"block",marginTop:"2px"}}><Link to={(item.postedBy._id !== state._id)?'/profile/'+item.postedBy._id:'/profile'}>{item.postedBy.name}</Link></h5>
                                {(item.postedBy._id == state._id)?
                                <i className="material-icons" style={{paddingLeft: "330px", display: "block" ,paddingTop: "6px"}} onClick={()=>{deletePost(item._id)}}>delete</i> : null
                                }
           
                            </div>

                            <div className="card-image">
                                <img src={item.imageUrl}  />
                            </div>

                            <div className ="card-content">
                                <i className="material-icons">favorite_border</i>
                                {item.likes.includes(state._id)?
                                <i className="material-icons" onClick={()=>{unlikepost(item._id)}}>thumb_down</i>
                                :
                                <i className="material-icons" onClick={()=>{likepost(item._id)}}>thumb_up</i>
                                 }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.content}</p>
                                {
                                    item.comments.map((record)=>{
                                        return(
                                            <h6 key={record._id}><span style={{fontWeight:"500"}} > {record.postedBy.name} </span> {record.text} </h6>
                                        )    
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id);//lay gia tri comment
                                    
                                }}>
                                    <input type ="text" placeholder="add a comment" />
                                </form>
                                
                            </div>
                        </div> 
                    ) 
                })
                
            }
                
        </div>
    )
}    


export default Home;