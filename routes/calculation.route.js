import { Router } from "express";
import { calculationController } from "../controllers/calculation.controller.js";

const calculationRouter = Router();

calculationRouter
  .post("/", calculationController.save)
  .get("/:username", calculationController.getCalculations);

export { calculationRouter };
