
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

const adminRequired = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return next(APIError.unauthorized());
    const token = authorization.token.split("")[1];
    const payload = verify(token, process.env.JWT_SECRET_TOKEN);
    if (!payload)
      return next(APIError.customError("Token expired", 401));
    if (payload.role.toLowerCase() !== "admin")
      return next(APIError.unauthenticated());
    req.body.id = payload.id;
    req.body.role = payload.role;
    next();
  } catch (error) {
    next(error);
  }
};
  module.exports = {
    adminRequired,
    userRequired,
  }


 

