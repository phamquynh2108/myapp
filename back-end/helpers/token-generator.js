const jwt = require('jsonwebtoken')

exports.generateToken = (user,SecretSignature,tokenLife) =>{
         //nhg tt muon luu vao token
    const userData = {
        _id : user._id,
        name : user.name,
        email: user.email,
    }
    //thuc hien ki va tao token
    try{
        const token = jwt.sign(
            {data: userData},
            SecretSignature,
            {
                algorithm:"HS256",
                expiresIn: tokenLife,
            }
        )
        return token;
    }catch(error){ 
        return error;
    }
}
//this module used for verify jwt token
exports.verifyToken = (token, secrectKey) =>{
        try{
            const decoded = jwt.verify(token,secrectKey)
            return decoded;
        }
        catch(error){
            return error;     
        }
    
}