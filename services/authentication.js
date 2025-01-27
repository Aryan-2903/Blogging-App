const JWT = require("jsonwebtoken");

const secret = "3278&*EQHk";

function createTokenForUser(user){
  const payload ={
    _id:user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email:user.email,
    profileImageURL:user.profileImageURL,
    role:user.role,
  };
  const token = JWT.sign(payload,secret);
  return token;
}

function validateToken(token){
  const payload = JWT.verify(token,secret);
  return payload;
}

module.exports={
  createTokenForUser,
  validateToken,
}