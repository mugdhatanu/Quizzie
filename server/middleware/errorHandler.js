const errorHandler = (err,req,res,next) => {
    res.status(err.status || 500);
    res.json({
        msg: err.message || "Internal Server Error",
    }) 
}

module.exports = errorHandler;