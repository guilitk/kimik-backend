import { v4 } from "uuid";
import {
  saveCalculation,
  getCalculationsByUsername,
} from "../repositories/calculation.repository.js";

async function save({ username, calculation }) {
  const id = v4();
  const createdOn = new Date();
  await saveCalculation({ id, username, createdOn, calculation });
}

async function getCalculations({ username }) {
  return await getCalculationsByUsername({ username });
}

export const calculationService = {
  save,
  getCalculations,
};
