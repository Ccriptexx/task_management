import "reflect-metadata";
import { config as configDotenv } from "dotenv";
configDotenv();
import express from 'express';
import routes from './api/routes';
import { config } from './config';
import { configureLogger } from "@d2sutils/logging";
import { AppDataSource } from "./config/data.source";
import redisClient from './config/redis.client';

const port = config.port;

const startService = async () => {
    const app = express();
    
    // Настройка логгера
    configureLogger(config.proxy, config.name);
    
    if (config.pg_connect === 'true') {
        await AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!");
            })
            .catch(error => console.log("Error during Data Source initialization", error));
    }
    
    await redisClient.connect().catch(err => console.error("Error connecting to Redis:", err));
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(routes);
    
    app.listen(port, () => {
        console.log(`Start service: ${config.name}`);
        console.log(`\x1b[32mServer is running on port ${port}\x1b[0m`);
    });
}

startService().catch(error => {
    console.log("Error during service start", error);
    process.exit(1);
});