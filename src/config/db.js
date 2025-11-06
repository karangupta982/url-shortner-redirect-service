import cassandra from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

const { ASTRA_DB_KEYSPACE, ASTRA_DB_APPLICATION_TOKEN } = process.env;

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  "token",
  ASTRA_DB_APPLICATION_TOKEN
);

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: "./secure-connect-url-shortner.zip",
  },
  keyspace: ASTRA_DB_KEYSPACE,
  authProvider,
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to Astra DB (Cassandra CQL API)");
  } catch (err) {
    console.error("Cassandra connection error:", err);
    process.exit(1);
  }
};

export default client;
