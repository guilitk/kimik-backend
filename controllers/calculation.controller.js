import { calculationService } from "../services/calculation.service.js";

class CalculationController {
  async save(req, res, next) {
    try {
      await calculationService.save(req.body);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  }

  async getCalculations(req, res, next) {
    try {
      const username = req.params.username;
      const { calculations } = await calculationService.getCalculations({
        username,
      });
      res.status(200).json({ calculations });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}

export const calculationController = new CalculationController();
