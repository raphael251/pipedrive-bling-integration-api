import { IOrder } from '../interfaces/IOrder';

export interface IOrderRepository {
  add(orderParams: IOrder): Promise<IOrder>;
  addMany(orders: Array<IOrder>): Promise<Array<IOrder>>;
  findByOrderId(orderId: string): Promise<IOrder>;
  find(): Promise<Array<IOrder>>;
}
