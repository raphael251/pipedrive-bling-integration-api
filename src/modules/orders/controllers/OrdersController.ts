import {
  IHttpController,
  IHttpRequest,
  IHttpResponse,
} from '../../../shared/interfaces/http';
import { IOrderRepository } from '../repositories/IOrderRepository';

export class OrdersController implements IHttpController {
  constructor(private orderRepository: IOrderRepository) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (req.params.orderId) {
        return {
          status: 200,
          body: await this.orderRepository.findByOrderId(req.params.orderId),
        };
      }

      return { status: 200, body: await this.orderRepository.find() };
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }
}
