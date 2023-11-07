require('dotenv').config();
const Hapi = require('@hapi/hapi');
const products = require('./api');
const ProductsService = require('./service/ProductService');

const init = async () => {
  const productService = new ProductsService();
  const server = Hapi.Server({
    host: 'localhost',
    port: 3000,
  });

  await server.register({
    plugin: products,
    options: {
      service: productService
    },
  });

  await server.start();
  console.log('Server running on ', server.info.uri);
}

init();