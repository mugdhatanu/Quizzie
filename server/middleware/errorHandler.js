const errorHandler = (err,req,res,next) => {
    res.status(err.status || 500);
    res.json({
        msg: err.msg || err.message
    }) 
}

module.exports = errorHandler;