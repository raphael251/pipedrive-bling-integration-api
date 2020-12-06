import axios, { AxiosResponse } from 'axios';
import xmlParser from 'xml-js';
import { IOrder } from '../../../interfaces/orders/IOrder';

export class BlingOrdersManager {
  async handle(order: IOrder): Promise<void> {
    try {
      const orderPayload = this.buildOrderPayload(order);
      const result = await this.sendOrder(orderPayload);

      console.log('\n\n\n');
      console.log('PAPÓCA');
      console.log('\n\n\n');
      console.log({
        data: result.data,
        headers: result.headers,
        status: result.status,
        statusText: result.statusText,
      });
      console.log('\n\n\n');
    } catch (error) {
      console.log('ERRO', Object.keys(error));
      console.log({
        data: JSON.stringify(error.response.data),
        headers: error.response.headers,
        status: error.response.status,
        statusText: error.response.statusText,
      });
    }
  }

  private buildOrderPayload(order: IOrder): any {
    const orderPayload = {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      },
      elements: [
        {
          type: 'element',
          name: 'pedido',
          elements: [
            {
              type: 'element',
              name: 'numero',
              elements: [
                {
                  type: 'text',
                  text: order.orderId,
                },
              ],
            },
            {
              type: 'element',
              name: 'cliente',
              elements: [
                {
                  type: 'element',
                  name: 'nome',
                  elements: [
                    {
                      type: 'text',
                      text: order.orgName,
                    },
                  ],
                },
              ],
            },
            {
              type: 'element',
              name: 'itens',
              elements: [
                {
                  type: 'element',
                  name: 'item',
                  elements: [
                    {
                      type: 'element',
                      name: 'codigo',
                      elements: [
                        {
                          type: 'text',
                          text: '01',
                        },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'descricao',
                      elements: [
                        {
                          type: 'text',
                          text: 'Compra no Pipedrive',
                        },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'qtde',
                      elements: [
                        {
                          type: 'text',
                          text: '1',
                        },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'vlr_unit',
                      elements: [
                        {
                          type: 'text',
                          text: order.value.toString(),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    return xmlParser.js2xml(orderPayload);
  }

  private sendOrder(orderPayload: any): Promise<AxiosResponse<any>> {
    const requestUrl = `https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.BLING_API_KEY}`;
    const requestBody = `xml=${orderPayload}`;
    const requestConfig = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    return axios.post(requestUrl, requestBody, requestConfig);
  }
}
