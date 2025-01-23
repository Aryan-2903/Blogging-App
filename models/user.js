const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("node:crypto");

const userSchema = new Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  salt:{
    type:String,
  },
  profileImageURL:{
    type:String,
    default:"./public/images/images.png"
  },
  role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER",
  },

},{timestamps:true});

userSchema.pre("save",function(next){
  const user = this; //this means we are pointing to the current user 
   if(!user.isModified("password")) return;

   const salt = randomBytes(16).toString();
   const hashedPassword = createHmac("sha256",salt)
   .update(user.password)
   .digest("hex");

   this.salt = salt;
   this.password=hashedPassword;
   next();
})

userSchema.static("matchPassword", async function(email,password){
  const user = await this.findOne({email});
  if(!user) throw new Error("User not found! please signup")

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256",salt)
  .update(password)
  .digest("hex");
  if(hashedPassword!==userProvidedHash) throw new Error("Wrong password")

  return user;
})


const User = model("user",userSchema);
module.exports = User;