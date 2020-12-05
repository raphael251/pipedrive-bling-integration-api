import express from 'express';
import cors from 'cors';
import httpRouter from './routes/http';

class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(httpRouter);
  }
}

export default new App().express;
