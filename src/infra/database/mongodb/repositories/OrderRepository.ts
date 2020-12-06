import { IOrder } from '../../../../interfaces/orders/IOrder';
import { IOrderRepository } from '../../../../interfaces/repositories/IOrderRepository';
import { OrderSchema } from '../schemas/orderSchema';

export class OrderRepository implements IOrderRepository {
  async add(order: IOrder): Promise<IOrder> {
    const addedOrder = await OrderSchema.create({
      orderId: order.orderId,
      orgName: order.orgName,
      clientName: order.clientName,
      value: order.value,
      currency: order.currency,
    });
    return addedOrder.toObject();
  }

  findByOrderId(orderId: number): Promise<IOrder> {
    return OrderSchema.findOne({ orderId }).lean();
  }

  find(): Promise<Array<IOrder>> {
    return OrderSchema.find().lean();
  }
}
