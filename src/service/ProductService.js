const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class ProductsService {
  constructor() {
    this._pool = new Pool();
  }

  async addProduct({
    name, price,category
  }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, price, category],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      console.log('Produk gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getProducts(name) {
    const query = {
      text: 'SELECT * FROM products WHERE name LIKE $1',
      values: [`%${name}%`],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = ProductsService;
