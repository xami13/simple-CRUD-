const errorMiddleware = (err, req, res, next) => {
    console.log('this is the error middleware');
    const statusCode = res.statusCode ? res.statusCode : 500; // This line sets the status code for the response. If the response already has a status code set (res.statusCode), it uses that; otherwise, it defaults to 500, which indicates an internal server error. This ensures that the client receives an appropriate HTTP status code based on the nature of the error.
    res.status(statusCode);// This line sets the HTTP status code for the response to the value determined in the previous line. It ensures that the client receives the correct status code indicating the result of the request (e.g., success, client error, server error).
    res.json({message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : null}); // This line sends a JSON response to the client containing the error message and, if the application is running in development mode, the stack trace of the error. The stack trace provides information about where the error occurred in the code, which can be useful for debugging. In production mode, the stack trace is not included in the response to avoid exposing sensitive information about the application's internal workings.
    // err.statck is a property of the error object that contains the stack trace, which is a string representation of the call stack at the point where the error was thrown. It helps developers understand the sequence of function calls that led to the error, making it easier to identify and fix issues in the code.
};

module.exports = errorMiddleware;

// why did u not need to import require("dotenv").config(); (?) --> The reason you don't need to import `require("dotenv").config();` in the `errorMiddleware.js` file is that the environment variables are already loaded in the main entry point of your application, which is typically `server.js`. When you call `require("dotenv").config();` in `server.js`, it loads the environment variables from the `.env` file into `process.env`, making them accessible throughout the entire application, including any middleware or other modules that are imported later.

