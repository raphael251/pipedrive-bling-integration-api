import { IOrder } from '../../../../modules/orders/interfaces/IOrder';
import { IOrderRepository } from '../../../../modules/orders/repositories/IOrderRepository';
import { OrderSchema } from '../schemas/orderSchema';

export class OrderRepository implements IOrderRepository {
  async add(order: IOrder): Promise<IOrder> {
    const addedOrder = await OrderSchema.create(order);
    return addedOrder.toObject();
  }

  async addMany(orders: Array<IOrder>): Promise<Array<IOrder>> {
    const addedOrders = await OrderSchema.insertMany(orders);
    return addedOrders.map((order) => order.toObject());
  }

  async findByOrderId(orderId: string): Promise<IOrder> {
    return (await OrderSchema.findOne({ orderId }).lean()) || {};
  }

  async find(): Promise<Array<IOrder>> {
    return (await OrderSchema.find().lean()) || {};
  }
}
