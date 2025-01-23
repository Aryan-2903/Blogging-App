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

 router.post("/signin", async(req,res)=>{
  const {email, password} = req.body;
  const user = await User.matchPassword(email,password);
  console.log("User",user);
  return res.redirect("/")
 })




 module.exports=router;