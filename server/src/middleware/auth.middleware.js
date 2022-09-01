const { verify, JsonWebTokenError} = require("jsonwebtoken");
const { APIError } = require("../Utils/apiError");

const userRequired = async(req, res, next)=>{
  try {
    const {authorization} = req.headers;
    if(!authorization){
      return next(APIError.unauthenticated())
    }

    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_SECRET_TOKEN);
    req.userId = payload.indexOf;
    req.userRole = payload.role;
    next()
  } catch (error) {
    let err = error;
    if(error instanceof JsonWebTokenError){
      err = APIError.badRequest("Invalid or expired Token supplied");
    }

    next(err)
  }
};

const adminRequired = async(req, res, next)=>{

  try {
    const isAdmin = req.role ==="admin";
    if(!isAdmin){
      return next(APIError.unauthorized());
    }

    next();
  } catch (error) {
    next(error)
  }
    
} 
  module.exports = {
    adminRequired,
    userRequired,
  }