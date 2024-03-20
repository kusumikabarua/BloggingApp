
const jwt=require("jsonwebtoken");
const authenticateToken = (req,res,next)=>{
   // console.log("I am authenticate middleware");
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if(token ==null){
    return res.sendStatus("401");
   }
   jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
    if(error){
        return res.sendStatus("403");
    }
    //console.log("Verified user Id",user);
    req.user = user;
    next();
   })
   
}
module.exports =authenticateToken;
