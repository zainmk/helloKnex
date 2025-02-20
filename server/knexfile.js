import { getSecret } from "../AzureKeyVaultAuth.js";

const config = {
  client: 'mysql2',
  connection: {
    host: await getSecret('MySQL-host'),
    port: 3306,
    user: await getSecret('MySQL-user'),
    password: await getSecret('MySQL-password'),
    database: 'migration_sandbox',
  },
  migrations: {
    directory: '../db/migrations',
  },
}

// test commit

// test commit 2

export default config;