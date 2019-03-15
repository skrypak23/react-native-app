import { Observable } from 'rxjs';
import IProduct from '../models/Product';
import * as API from '../utils/api';
import { ProductEntity } from '../typing/state';

type TFetch = {
  url: string;
};
type TData = TFetch & {
  body: IProduct;
};

class ProductService {
  static createProduct(data: TData): Observable<IProduct> {
    return API.createData<IProduct>(data.url, data.body);
  }
  static editProduct(data: TData, products: ProductEntity): Observable<IProduct> {
    const foundProduct = products.byId[data.body._id];
    if (foundProduct.name === data.body.name) {
      const { price } = data.body;
      return API.editData<IProduct>(data.url, { price } as IProduct);
    }
    return API.editData<IProduct>(data.url, data.body);
  }
  static deleteProduct(data: TFetch) {
    return API.deleteData<IProduct>(data.url);
  }
  static fetchProducts(data: TFetch) {
    return API.getAll<IProduct>(data.url);
  }
  static fetchProductById(data: TFetch) {
    return API.getOne<IProduct>(data.url);
  }
}

export default ProductService;
