import { IHttpRequest, IHttpResponse } from '../interfaces';

export class PipedriveController {
  handle(req: IHttpRequest): IHttpResponse {
    console.log('HEADERS', req.headers);
    console.log(JSON.stringify(req.body));
    return { status: 200 };
  }
}
