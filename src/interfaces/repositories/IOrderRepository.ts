import { IOrder } from '../orders/IOrder';

export interface IOrderRepository {
  add(orderParams: IOrder): Promise<IOrder>;
  findByOrderId(orderId: number): Promise<IOrder>;
  find(): Promise<Array<IOrder>>;
}
