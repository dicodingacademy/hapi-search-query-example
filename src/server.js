require('dotenv').config();
const Hapi = require('@hapi/hapi');
const products = require('./api');
const ProductsService = require('./service/ProductService');
const ProductValidator = require('./validator');

const init = async () => {
  const productService = new ProductsService();
  const server = Hapi.Server({
    host: 'localhost',
    port: 3000,
    debug: {
      request: ['error']
    }
  });

  await server.register({
    plugin: products,
    options: {
      service: productService,
      validator: ProductValidator
    },
  });

  await server.start();
  console.log('Server running on ', server.info.uri);
}

init();