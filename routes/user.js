const {Router} = require("express");
const User = require("../models/user")

const router = Router();

router.get("/signin",(req,res)=>{
  return res.render('signin');
})
 router.get("/signup",(req,res)=>{
  return res.render("signup");

 })

 router.post("/signup",async (req,res)=>{
  const {firstName, lastName, email, password} = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  return res.redirect("/");

 })
//this route will match the email and passsword given by the user and will return error if pass or email is wrong
 router.post("/signin", async(req,res)=>{
  const {email, password} = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect("/");
    
  } catch (error) {
    return res.render("signin",{
      error:"Incorrect Email or Password",
    });
  };
 });
//lpgout route
 router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/")
 })




 module.exports=router;
