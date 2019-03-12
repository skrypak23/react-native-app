import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import customer from './customer/reducers';
import product from './product/reducers';
import invoice from './invoice/reducers';
import invoiceItem from './invoice-item/reducers';
import request from './request/reducers';
import alert from './alert/reducers';

export default combineReducers({
  customer,
  product,
  invoice,
  invoiceItem,
  request,
  alert,
  form
});
