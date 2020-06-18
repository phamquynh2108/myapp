import React, { useState } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [content,setContent] = useState("")
    const [imgFile, setImgFile] = useState(undefined)
    const [imgSrc, setImgSrc] = useState("")//de the img co tt src co the hieu dc chu k doc dc file object
    //const [imgUrl, setImgUrl] = useState("")
    const handleImageChange = (event) =>{
        const img = event.target.files[0];
        //validate image: Filetype+file size
        if(img){
            const fileReader = new FileReader() //convert img to base64 string
            fileReader.readAsDataURL(img)
            fileReader.onloadend=(data)=>{
                console.log(data);
                setImgFile(img)
                setImgSrc(data.currentTarget.result)
            }
        }
    }
    const handleSubmit = () =>{
        const formData = new FormData()
        formData.append('image',imgFile)
        //vi fetch chi nhan object nen chi gui imgFile chu k phai la imgSrc
        fetch('http://localhost:3001/uploads/image',{
            method:'POST',
            credentials:'include',
            headers:{
                'Accept':'application/json'
            },
            body:formData,
        }).then((res)=>res.json())
        .then((data)=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }else{
                fetch('http://localhost:3001/posts/create-post',{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' ,
                    'x-access-token':localStorage.getItem("jwt")
                },
                    credentials:'include',
                    body:JSON.stringify({
                        title:title,
                        content:content,
                        imageUrl: data.imageUrl,
                    }),
                })
                .then((res)=>res.json())
                .then((datas)=>{
                    console.log(datas);
                    if(datas.error){
                        M.toast({html:datas.error, classes:"#c62828 red darken-3"})
                    }else{
                        M.toast({html:"Created post success", classes:"#00bfa5 teal accent-4"})
                        history.push('/home')
                    }
                    
                })
                .catch((error)=>{
                    M.toast({html:error, classes:"#c62828 red darken-3"})
                })
            }
           
        })
        .catch((error)=>{
            M.toast({html:error, classes:"#c62828 red darken-3"})
            
        })
    }
        return (
            <div className ="card input-field" style={{
                margin:"50px auto",
                maxWidth:"500px",
                textAlign:"center",
                padding:"20px"

            }}>
                <input type="text" 
                placeholder="title" 
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
                <input type="text" 
                placeholder="content" 
                value={content}
                onChange ={(e)=>{setContent(e.target.value)}}
                />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>upload image</span>
                        <input type="file" 
                        accept="image/*"
                        onChange={(event)=>{handleImageChange(event)}}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>   
                    { imgSrc ? (
                        <div>
                            <img src ={imgSrc} style={{height:`150px`,
                                                width:`auto`}} alt='Preview' />
                        </div>
                    ): null}
                </div>
                <button type="submit" className="btn waves-effect waves-light btns" onClick={()=>{handleSubmit()}}>Create Post </button>
            </div>
        );
    
}

export default CreatePost;