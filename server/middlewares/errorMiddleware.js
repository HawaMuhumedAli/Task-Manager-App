// Middleware to handle routes that are not found
const routeNotFound = (req, res, next) => {
    // Create an error object with a message indicating the route was not found
    const error = new Error(`Route not found: ${req.originalUrl}`);
    // Set the status code to 404 (Not Found)
    res.status(404);
    // Pass the error to the next middleware
    next(error);
};

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    // If the status code is 200, set it to 500 (Internal Server Error)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Get the error message
    let message = err.message;

    // If the error is a CastError and the kind is ObjectId, set status to 404 and update the message
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    // Respond with the status code and JSON containing the error message and stack trace
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
    });
};

export { routeNotFound, errorHandler };
