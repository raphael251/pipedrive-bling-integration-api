import { Request, Response, NextFunction } from 'express';

export class PipedriveBasicAuthMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    const encryptedAuthHeader = req.headers.authorization;
    if (!encryptedAuthHeader) return res.status(401).send();
    if (!process.env.PIPEDRIVE_USERNAME || !process.env.PIPEDRIVE_PASS) {
      return res.status(500).send();
    }
    const authHeader = Buffer.from(encryptedAuthHeader, 'base64').toString().split(' ');
    const authHeaderType = authHeader[0];
    const authHeaderValues = authHeader[1].split(':');
    const pipedriveUsername = authHeaderValues[0];
    const pipedrivePass = authHeaderValues[1];

    if (
      authHeaderType !== 'Basic'
      || pipedriveUsername !== process.env.PIPEDRIVE_USERNAME
      || pipedrivePass !== process.env.PIPEDRIVE_PASS
    ) {
      return res.status(401).send();
    }
    return next();
  }
}
