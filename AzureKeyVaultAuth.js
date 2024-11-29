// converted to ESM
import dotenv from 'dotenv';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

dotenv.config({ path: '.env' });

export const getMySQLSecrets = async () => {

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(process.env.KEYVAULT_URI, credential)

    const host = await client.getSecret('host')
    const port = await client.getSecret('port').value
    const user = await client.getSecret('user').value
    const password = await client.getSecret('password').value

    return host.value;
}