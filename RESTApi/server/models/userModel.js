import mongoose  from "mongoose";


const userSchema= mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String, required:true},
  age:{type:String, required:true},
  country:{type:String, required:true},
  password:{type:String, required:true}
})


const userModel=mongoose.model("Users", userSchema);

export {userModel}