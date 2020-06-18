const jwtHelper = require('../helpers/token-generator')
var  UserModel = require('../models/user')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

exports.isAuth = (req,res,next) =>{
    const tokenFromClient = req.headers["x-access-token"];
    //console.log(tokenFromClient);
    
    if(tokenFromClient){
        //neu ton tai token
        try{
            //giai ma token xem hop le hay k
            const decoded =  jwtHelper.verifyToken(tokenFromClient,accessTokenSecret)
            //req.jwtDecoded = decoded;
            //cho phep req di tiep sang controller tiep theo
            UserModel.findById(decoded.data._id)
            .then(user=>{
                req.user = user
                next()
            })
            .catch(err=>{
                console.log(err);
                
            })
        }catch(error){
            return res.status(401).json({
                message:'Unauthorized',
            });
        }
    }else{
        // k tim thay
        return res.status(403).send({
            message:'No token provided and please login'
        })
    }
}