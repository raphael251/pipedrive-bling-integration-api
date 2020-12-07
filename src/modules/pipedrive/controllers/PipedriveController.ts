import { IHttpRequest, IHttpResponse } from '../../../shared/interfaces/http';
import { BlingOrdersManager } from '../../../modules/bling/orders/BlingOrdersManager';
import { IOrder } from '../../orders/interfaces/IOrder';
import { IHttpController } from '../../../shared/interfaces/http/IHttpController';
import { IOrderRepository } from '../../orders/repositories/IOrderRepository';

export class PipedriveController implements IHttpController {
  constructor(private orderRepository: IOrderRepository) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const orderPayload: IOrder = this.buildOrderPayload(req.body);

      if (
        this.wasTheOrderStatusChangedToWon(
          req.body.previous.status,
          req.body.current.status
        )
      ) {
        await this.orderRepository.add(orderPayload);
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
    };
  }

  private wasTheOrderStatusChangedToWon(
    previousStatus: string,
    currentStatus: string
  ): boolean {
    return previousStatus === 'open' && currentStatus === 'won';
  }
}
