exports.verifyRoles = allowedRole => (req, res, next)=>{
    try {
      if(allowedRole === req.role){
        return next()
      } 
      next(APIError.unauthorized(`Unauthorized! you can not access this route because you are a ${req.role}`))
        
    } catch (error) {
      next(error)
    }
  }