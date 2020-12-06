import { IHttpRequest, IHttpResponse } from '../interfaces/http';
import { BlingOrdersManager } from '../modules/bling/orders/BlingOrdersManager';
import { IOrder } from '../interfaces/orders/IOrder';

export class PipedriveController {
  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const orderPayload: IOrder = this.buildOrderPayload(req.body);
      const { previousStatus, currentStatus } = orderPayload;

      if (this.wasTheOrderStatusChangedToWon(previousStatus, currentStatus)) {
        await new BlingOrdersManager().handle(orderPayload);
      }

      return { status: 200 };
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }

  private buildOrderPayload(requestBody: any): IOrder {
    return {
      orderId: requestBody.current.id,
      value: requestBody.current.value,
      currency: requestBody.current.currency,
      clientName: requestBody.current.person_name,
      orgName: requestBody.current.org_name,
      previousStatus: requestBody.previous.status,
      currentStatus: requestBody.current.status,
    };
  }

  private wasTheOrderStatusChangedToWon(previousStatus: string, currentStatus: string): boolean {
    return previousStatus === 'open' && currentStatus === 'won';
  }
}
