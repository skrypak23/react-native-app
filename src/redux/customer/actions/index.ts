import { action, createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../shared/models/Customer';
import * as CUSTOMER_TYPES from './types';
import { ID } from '../../../shared/typing/records';

export const setCustomerData = createStandardAction(CUSTOMER_TYPES.SET_CUSTOMER_DATA)<
  ICustomer[]
>();
export const deleteActionData = createStandardAction(CUSTOMER_TYPES.DELETE_CUSTOMER_DATA)<
  ICustomer
>();

export const createCustomer = createStandardAction(CUSTOMER_TYPES.CREATE_CUSTOMER)<
  ICustomer
>();
export const editCustomer = (id: ID, customer: ICustomer) =>
  action(CUSTOMER_TYPES.EDIT_CUSTOMER, { id, customer });
export const deleteCustomer = createStandardAction(CUSTOMER_TYPES.DELETE_CUSTOMER)<
  string
>();
export const fetchCustomers = createStandardAction(CUSTOMER_TYPES.FETCH_CUSTOMERS)<
  undefined
>();
export const fetchCustomer = createStandardAction(CUSTOMER_TYPES.FETCH_CUSTOMER)<
  string
>();
export const resetCustomerLocal = createStandardAction(CUSTOMER_TYPES.RESET_CUSTOMER)<
  undefined
>();
