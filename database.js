import { createConnection } from "mariadb";

const connectionConfiguration = {
  host: "kimikdb.cgfdl1axgrvd.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "root",
  password: "GTKadmin",
  database: "kimikdb",
};

async function getConnection() {
  return await createConnection(connectionConfiguration);
}

async function executeQuery(queryString, values) {
  let connection;

  try {
    connection = await getConnection();

    return values
      ? await connection.query(queryString, values)
      : await connection.query(queryString);
  } finally {
    connection && connection.destroy();
  }
}

export { executeQuery };
