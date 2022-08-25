const notFound = (req, res, next)=>{
    const err = new Error("Route not found");
    err.status = 404;
    next(err);
}


const errorHandler = (err, req, res, next)=>{
    res.status(err.status || 500).json({msg: err.message || "Unknown Error"})
}

module.exports = {
    notFound,
    errorHandler
}