const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
   {
        username:{
            type:String,
            required:true
        },      
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        }
    },{
        timestamps: true,
    }

)
userSchema.methods.comparePassword = async function(enteredPassword){
   //console.log("existing password"+ this.password);
    return await bcrypt.compare(enteredPassword,this.password);
}
const User = mongoose.model("User",userSchema);
module.exports= User;