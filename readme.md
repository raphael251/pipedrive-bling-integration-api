# Pipedrive <-> Bling - Integration API

Essa aplicação foi criada com o propósito de integrar as plataformas Pipedrive e Bling, onde quando uma oportunidade é dada como ganha no pipedrive, é inserida como um pedido Bling com o nome da empresa e valor total. Além disso, também foram criadas duas rotas para disponibilizar esses mesmos pedidos que tiveram seu status alterado para ganho.

## Rodando a aplicação em desenvolvimento

Caso queira conhecer a aplicação, além de clonar o projeto e rodar o comando o comando `yarn` ou `npm install`,
precisará de uma conta no Pipedrive e uma no Bling (as duas podem ser criadas de forma gratuita por um tempo).

No caso do pipedrive, será necessário cadastrar uma URL no webhook deles, em sua configuração de integrações. Para facilitar o processo, aqui na raiz do repositório você pode rodar o comando `node ngrok-server` e criar uma conexão com o mundo exterior utilizando o ngrok, dessa forma basta copiar a URL que será consolada no terminal e colar como URL do webhook do Pipedrive, inserindo o path `/pipedrive` ao final da url. Além disso, é necessário que você crie também um usuário e senha no momento da criação do webhook, passando os dois como variável de ambiente para a aplicação.

Para o Bling também será necessária uma conta e na parte de usuários, será necessário criar um Usuário API, onde será gerada uma apikey que também deverá passada via variável de ambiente.

Como última configuração inicial, será necessária a criação de um banco de dados em MongoDB. Atualmente não existe um banco local utilizando Docker por exemplo, então recomendo a criação de uma conta grátis no Mongo Atlas, onde é fornecida a string de conexão que deverá ser colocada como variável de ambiente.

Após essas configurações, basta dar o comando `yarn serve:dev` ou `npm run serve:dev` e criar um novo negócio no Pipedrive, depois clicar no mesmo e depois em **ganho** ou **won**. A partir desse momento poderá entrar no Bling e ir na seção de pedidos para visualizar o pedido gerado e também fazer uma requisição para um dos endpoints abaixo, utilizando como base a URL `http://localhost:3000` ou então a URL gerada pelo **ngrok**.

## Endpoints

> - GET - /orders
>   - **Descrição**: Neste endpoint todos os pedidos serão listados agrupados por dia e valor total.
> - GET - /orders/{orderId}
>   - **Descrição**: Neste endpoint apenas um pedido será retornado, conforme o número do pedido informado como parâmetro.
