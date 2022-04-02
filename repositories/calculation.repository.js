import { executeQuery } from "../database.js";

const saveCalculation = async ({ id, username, createdOn, calculation }) => {
  const queryString = `INSERT INTO calculations (id,username,created_on,calculation) VALUES (?,?,?,?)`;

  await executeQuery(queryString, [id, username, createdOn, calculation]);
};

const getCalculationsByUsername = async ({ username }) => {
  const queryString = `SELECT * FROM calculations WHERE username = ?`;

  const calculations = await executeQuery(queryString, username);

  return {
    calculations,
  };
};

export { saveCalculation, getCalculationsByUsername };
