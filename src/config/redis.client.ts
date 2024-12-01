import { createClient } from 'redis';
import { config } from './config';

const client = createClient({ url: config.redis_url });

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;