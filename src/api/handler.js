class ProductsHandler {
  constructor(service) {
    this._service = service;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
  }

  async postProductHandler(request, h) {
      const { name, price, category } = request.payload;

      const id = await this._service.addProduct({ name, price, category });

      const response = h.response({
        status: 'success',
        message: 'Produk berhasil dimasukkan',
        data: {
          id
        },
      });
      response.code(201);
      return response;
  }

  async getProductsHandler(request, h) {
    const { name= '' } = request.query;

    const products = await this._service.getProducts(name)
      const response = h.response ({
        status: 'success',
        message: 'Produk berhasil ditampilkan',
        data: {
          products
        },
      });
      return response;
  }
}

module.exports = ProductsHandler;