import { Router } from "express";

const router = Router();


router.get("/loggerTest", (req, res) => {
    req.logger.fatal("This is a fatal log.");
    req.logger.error("This is an error log.");
    req.logger.warning("This is a warning log.");
    req.logger.http("This is an http log.");
    req.logger.debug("This is a debug log.");
  
    res.send("Logs generated. Check the console and log files.");
  });


  export default router;