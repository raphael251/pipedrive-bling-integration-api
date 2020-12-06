import { IHttpRequest, IHttpResponse } from '../interfaces';
import { BlingOrdersBuilder } from '../modules/bling/orders/BlingOrdersBuilder';

type OrderPayload = {
  value: number;
  currency: string;
  clientName: string;
  orgName: string;
  previousStatus: string;
  currentStatus: string;
};

export class PipedriveController {
  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const orderPayload: OrderPayload = this.buildOrderPayload(req.body);
      const { previousStatus, currentStatus } = orderPayload;

      if (this.wasTheOrderStatusChangedToWon(previousStatus, currentStatus)) {
        await new BlingOrdersBuilder().handle(orderPayload);
      }

      console.log(orderPayload);
      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }

  private buildOrderPayload(requestBody: any): OrderPayload {
    return {
      value: requestBody.current.value,
      currency: requestBody.current.currency,
      clientName: requestBody.current.person_name,
      orgName: requestBody.current.org_name,
      previousStatus: requestBody.previous.status,
      currentStatus: requestBody.current.status,
    };
  }

  private wasTheOrderStatusChangedToWon(previousStatus: string, currentStatus: string): boolean {
    return orderPayload.previousStatus === 'open' && orderPayload.currentStatus === 'won';
  }
}
