import { MongoDb } from '../MongoDb';
import { OrderRepository } from './OrderRepository';
import { IOrderRepository } from '../../../../interfaces/repositories/IOrderRepository';
import { IOrder } from '../../../../interfaces/orders/IOrder';

function makeSUT(): { sut: IOrderRepository } {
  const sut = new OrderRepository();
  return { sut };
}

describe('Test OrderRepository class', () => {
  beforeAll(async () => {
    await MongoDb.connect();
  });

  afterAll(async () => {
    await MongoDb.disconnect();
  });

  it('Should return a Order object when add an order', async () => {
    const { sut } = makeSUT();
    const orderParams: IOrder = {
      clientName: 'Regiane Tomaz',
      currency: 'BRL',
      orderId: '25',
      orgName: 'Re Tomaz Piercing',
      value: 250.33,
    };
    const response = await sut.add(orderParams);
    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.any(Object),
        clientName: expect.stringContaining(orderParams.clientName),
        currency: expect.stringContaining(orderParams.currency),
        orderId: expect.stringContaining(orderParams.orderId),
        orgName: expect.stringContaining(orderParams.orgName),
        value: expect.any(Number),
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should return a Order object with the respective orderId when call findByOrderId', async () => {
    const { sut } = makeSUT();
    const orderParams: IOrder = {
      clientName: 'Regiane Tomaz',
      currency: 'BRL',
      orderId: '25',
      orgName: 'Re Tomaz Piercing',
      value: 250.33,
    };
    await sut.add(orderParams);
    const response = await sut.findByOrderId('25');
    expect(response).toEqual(
      expect.objectContaining({
        _id: expect.any(Object),
        clientName: expect.stringContaining(orderParams.clientName),
        currency: expect.stringContaining(orderParams.currency),
        orderId: expect.stringContaining(orderParams.orderId),
        orgName: expect.stringContaining(orderParams.orgName),
        value: expect.any(Number),
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      })
    );
  });

  it('Should return a Order objects array when add an array of orders', async () => {
    const { sut } = makeSUT();
    const ordersParams: Array<IOrder> = [
      {
        clientName: 'Regiane Tomaz',
        currency: 'BRL',
        orderId: '25',
        orgName: 'Re Tomaz Piercing',
        value: 250.33,
      },
      {
        clientName: 'Regiane Tomaz',
        currency: 'BRL',
        orderId: '26',
        orgName: 'Re Tomaz Piercing',
        value: 250.33,
      },
    ];
    const response = await sut.addMany(ordersParams);
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining(ordersParams[0]),
        expect.objectContaining(ordersParams[1]),
      ])
    );
  });

  it('Should return an array with all orders when call the find method', async () => {
    const { sut } = makeSUT();
    const ordersParams: Array<IOrder> = [
      {
        clientName: 'Regiane Tomaz',
        currency: 'BRL',
        orderId: '25',
        orgName: 'Re Tomaz Piercing',
        value: 250.33,
      },
      {
        clientName: 'Regiane Tomaz',
        currency: 'BRL',
        orderId: '26',
        orgName: 'Re Tomaz Piercing',
        value: 250.33,
      },
    ];
    await sut.addMany(ordersParams);
    const response = await sut.find();
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining(ordersParams[0]),
        expect.objectContaining(ordersParams[1]),
      ])
    );
  });

  it('Should throw an exception if add throws', async () => {
    const { sut } = makeSUT();
    const orderParams: IOrder = {
      clientName: 'Regiane Tomaz',
      currency: 'BRL',
      orderId: '25',
      orgName: 'Re Tomaz Piercing',
      value: 250.33,
    };
    jest
      .spyOn(sut, 'add')
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    await expect(sut.add(orderParams)).rejects.toThrow();
  });
});
