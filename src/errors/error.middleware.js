export const errorMiddleware = (err, req, res, next) => {
  res.send({ name: err.name, message: err.message, cuase: err.cause });
};
