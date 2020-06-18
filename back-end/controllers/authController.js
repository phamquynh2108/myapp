
var bcrypt = require('bcrypt')
var UserModel = require('../models/user')

const validate = require('../helpers/validate')
const jwtHelper = require('../helpers/token-generator')
// Thời gian sống của token
const accessTokenLife = "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

exports.home = (req,res) => {
  return res.status(200).json({message:'Hello'})
}
exports.signup = (req,res) => {
  const {email,password,name} = req.body;
  if(!email||!password || !name){
    return res.status(422).json({error:"Please add all the field"});
  }else{
    UserModel.findOne({email:email})
    .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with email"})
      }else{
        //create new user
        if(validate.checkPassword(password)){
          if(validate.checkEmail(email)){
            bcrypt.hash(password,12)
            .then(hashPassword=>{
              UserModel.create({
                ...req.body,
                password:hashPassword
              })
              .then(user=>{
                res.json({message:"saved successfully"})
              })
              .catch(err=>{
                console.log(err);  
              })
            })
          }else{
            return res.status(422).json({error:"Email chưa đúng định dạng. Vd: abc@abc.com.vn "})
          }
        }else{
          return res.status(422).json({error:"Mật khẩu sai định dạng : Mật khẩu có độ dài từ 6 đến 16 ký tự có ít nhất 1 số và 1 chữ cái"})
        }
        
      }
    })  
    .catch(err=>{
      console.log(err); 
    })
  }
}

exports.signin = ( req,res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(422).json({error:"Please add all the field"});
  }
  UserModel.findOne({email:email})
  .then(User=>{
    if(!User){
      return res.status(422).json({error: "Invalid email or password"})
    }
    bcrypt.compare(password,User.password)
    .then(doMatch=>{
      if(doMatch){
        //tao ma token
        const accessToken = jwtHelper.generateToken(User,accessTokenSecret,accessTokenLife);
        const{_id,email,name,followers,following} = User;
        return res.status(200).json({accessToken,user:{_id,email,name,followers,following}})
      }else{
        return res.status(422).json({error: "Wrong password"})
      }
    })
    .catch(err=>{
      console.log(err);  
    })
  })
  .catch(err=>{
    console.log(err);
  })
}

