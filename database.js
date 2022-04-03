import { createConnection } from "mariadb";

const connectionConfiguration = {
  host: "kimikdb.cgfdl1axgrvd.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "root",
  password: "GTKadmin",
  database: "kimikdb",
  // 'connectTimeout' is the maximum number of milliseconds before a timeout
  // occurs during the initial connection to the database.
  connectTimeout: 10000, // 10 seconds
  // 'acquireTimeout' is the maximum number of milliseconds to wait when
  // checking out a connection from the pool before a timeout error occurs.
  acquireTimeout: 10000, // 10 seconds
  // 'waitForConnections' determines the pool's action when no connections are
  // free. If true, the request will queued and a connection will be presented
  // when ready. If false, the pool will call back with an error.
  waitForConnections: true, // Default: true
  // 'queueLimit' is the maximum number of requests for connections the pool
  // will queue at once before returning an error. If 0, there is no limit.
  queueLimit: 0, // Default: 0
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
