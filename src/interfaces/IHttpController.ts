import { IHttpRequest } from './IHttpRequest';
import { IHttpResponse } from './IHttpResponse';

export interface IHttpController {
  handle(req: IHttpRequest): IHttpResponse;
}
