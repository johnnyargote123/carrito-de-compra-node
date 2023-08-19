import  logger  from "../utils/logger.js";

function addLogger(req, res, next) {
  req.logger = logger;
  req.logger.info(
    `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
  );
  next();
}



export { addLogger };
