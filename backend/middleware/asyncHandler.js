// const asyncHandler = (handler) => async (req, res, next) => {
//     return Promise.resolve(handler(req, res, next)).catch(next);    
// }

const asyncHandler = (handler) => {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error); // Pass the error to the next middleware
      }
    };
  };

export default asyncHandler;