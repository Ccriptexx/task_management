import * as process from "process";

export const config = {
    name: process.env.APP_NAME || 'app',
    node: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    proxy: process.env.PROXY_URI || 'http://localhost:3000',
    pg_uri: process.env.PG_URI || 'postgres://localhost:5432',
    pg_connect: process.env.PG_CONNECT || 'false',
    redis_url: process.env.REDIS_URL || 'redis://localhost:6379'
}
