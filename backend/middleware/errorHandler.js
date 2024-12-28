const notFoundErr = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`)
    err.status = 404
    next(err);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;
    
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🎂' : err.stack
    })
}

export { notFoundErr, errorHandler };