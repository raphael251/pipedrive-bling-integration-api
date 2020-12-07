import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import dotenv from 'dotenv';
import httpRouter from './routes/http';
import { MongoDb } from './database/mongodb/MongoDb';

class App {
  express: express.Application;

  constructor() {
    this.dotEnv();
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  private dotEnv() {
    dotenv.config({
      path:
        process.env.NODE_ENV === 'test'
          ? resolve(process.cwd(), '.env.test')
          : resolve(process.cwd(), '.env'),
    });
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(httpRouter);
  }

  private async database(): Promise<void> {
    try {
      await MongoDb.connect();
    } catch (error) {
      console.error('APP >> database:', error);
    }
  }
}

export default new App().express;
