import dotenv from "dotenv";
import { program } from "commander";

program
  .option("-per, --persistence <type>", "Tipo de persistencia: MONGO o MEMORY")
  .option("-env, --environment <type>", "Tipo de ambiente");

program.parse(process.argv);

const { persistence, environment } = program.opts();
const persistenceUpdate = persistence == undefined ? 'MONGO' : persistence;
const environmentUpdate = environment == undefined ?  'dev' : environment
console.log(persistenceUpdate);
console.log(environmentUpdate);


dotenv.config();

const config = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl: process.env.DB_URL,
  sessionSecret: process.env.SESSION_SECRET,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,
  persistence: persistenceUpdate.toUpperCase() ,
  service: process.env.SERVICE,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  environment: environmentUpdate,
};

export default config;