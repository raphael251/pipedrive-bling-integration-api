import { Request, Response, NextFunction } from 'express';

export class PipedriveBasicAuthMiddleware {
  static handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any> | void {
    try {
      const encodedCredentials = this.validateAuthHeader(req.headers);

      if (!encodedCredentials) return res.status(401).send();
      if (!process.env.PIPEDRIVE_USERNAME || !process.env.PIPEDRIVE_PASS) {
        throw new Error('pipedrive auth env variables is not setted.');
      }
      const decodedCredentials = this.decodeCredentials(encodedCredentials);
      const [pipedriveUsername, pipedrivePass] = decodedCredentials.split(':');

      if (this.isCredentialsValid(pipedriveUsername, pipedrivePass))
        return next();

      return res.status(401).send();
    } catch (error) {
      return res.status(500).send({});
    }
  }

  private static validateAuthHeader(authHeader: any): string | null {
    if (!authHeader.authorization) return null;
    const [authHeaderType, authHeaderContent] = authHeader.authorization.split(
      ' '
    );
    if (authHeaderType !== 'Basic') return null;
    return authHeaderContent;
  }

  private static decodeCredentials(encodedAuthHeader: string): string {
    return Buffer.from(encodedAuthHeader, 'base64').toString();
  }

  private static isCredentialsValid(userName: string, pass: string) {
    return (
      userName === process.env.PIPEDRIVE_USERNAME &&
      pass === process.env.PIPEDRIVE_PASS
    );
  }
}
