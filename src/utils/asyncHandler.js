// Higher-order function
// Takes an async request handler as an argument
// and returns a new Express middleware function.
//
// The returned function executes the original request handler.
// If the handler's Promise is rejected, the error is passed
// to Express using next(error).
export const asyncHandler = (requestHandler) => {

    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch(err => next(err))
    }
}