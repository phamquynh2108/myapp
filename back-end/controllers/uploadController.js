
const fs=require('fs');


exports.upload = (req,res) =>{
    console.log(req.file);//is the 'avatar' file
    fs.rename(`public/${req.file.filename}`,  `public/${req.file.originalname}`,(err)=>{
        if(err){
            res.json(422).json({error:err})
        }else{
            res.json({imageUrl:`http://localhost:3001/${req.file.originalname}`})//phai theo server backend
        }
    })
    
}