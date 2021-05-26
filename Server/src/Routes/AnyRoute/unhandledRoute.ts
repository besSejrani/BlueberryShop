// Express
import express, { Request, NextFunction } from "express";

// Errors
import { NotFoundError } from "src/Error/Errors/NotFoundError";

// ========================================================================================================
const router = express.Router();

router.all("*", (req: Request, _, next: NextFunction) => {
  const err = new NotFoundError(`Can't find ${req.originalUrl}`);
  next(err);
});

export default router;
