import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../shared/models/Product';
import * as PRODUCT_TYPES from './types';
import { ID } from '../../../shared/typing/records';

export const setProductData = createStandardAction(PRODUCT_TYPES.SET_PRODUCT_DATA)<
  IProduct[]
>();

export const deleteProductData = createStandardAction(PRODUCT_TYPES.DELETE_PRODUCT_DATA)<
  IProduct
>();

export const createProduct = createStandardAction(PRODUCT_TYPES.CREATE_PRODUCT)<
  IProduct
>();
export const editProduct = (id: ID, product: IProduct) =>
  action(PRODUCT_TYPES.EDIT_PRODUCT, { id, product });
export const deleteProduct = createStandardAction(PRODUCT_TYPES.DELETE_PRODUCT)<string>();
export const fetchProducts = createStandardAction(PRODUCT_TYPES.FETCH_PRODUCTS)<
  undefined
>();
export const fetchProduct = createStandardAction(PRODUCT_TYPES.FETCH_PRODUCT)<string>();
export const resetProductLocal = createStandardAction(PRODUCT_TYPES.RESET_PRODUCT)<
  undefined
>();
