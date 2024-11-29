import { getMySQLSecrets } from "./AzureKeyVaultAuth.js";

const config = {
  client: 'mysql2',
  connection: { ...await getMySQLSecrets(), database: "migration_sandbox"},
  migrations: {
    directory: './db/migrations'
  }
}

export default config;