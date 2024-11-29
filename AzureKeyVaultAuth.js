
import dotenv from 'dotenv';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

dotenv.config({ path: '.env' });

export const getSecret = async(name) => {
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(process.env.KEYVAULT_URI, credential)

    const result = await client.getSecret(name).then(secret => secret.value)
    return result
}