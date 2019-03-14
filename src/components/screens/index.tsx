import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import CustomerScreen from './Customer';
import ProductScreen from './Product';
import InvoiceScreen from './Invoice';
import SideBar from '../../shared/components/SideBar';
import PATHS from '../../shared/paths';
import CustomerDetailScreen from './CustomerDetail';
import ProductDetailScreen from './ProductDetail';
import InvoiceDetailScreen from './InvoiceDetail';
import CreateCustomerScreen from './ActionCustomer';
import CreateProductScreen from './ActionProduct';
import CreateInvoiceScreen from './ActionInvoice';

const CustomerNavigator = createStackNavigator(
  {
    [PATHS.Customers]: CustomerScreen,
    [PATHS.CustomerDetail]: CustomerDetailScreen,
    [PATHS.CustomerForm]: CreateCustomerScreen
  },
  { initialRouteName: PATHS.Customers }
);
const ProductNavigator = createStackNavigator(
  {
    [PATHS.Products]: ProductScreen,
    [PATHS.ProductDetail]: ProductDetailScreen,
    [PATHS.ProductForm]: CreateProductScreen
  },
  { initialRouteName: PATHS.Products }
);
const InvoiceNavigator = createStackNavigator(
  {
    [PATHS.Invoices]: InvoiceScreen,
    [PATHS.InvoiceDetail]: InvoiceDetailScreen,
    [PATHS.InvoiceForm]: CreateInvoiceScreen
  },
  { initialRouteName: PATHS.Invoices }
);

const MainNavigator = createDrawerNavigator(
  {
    [PATHS.CustomerDrawer]: CustomerNavigator,
    [PATHS.ProductDrawer]: ProductNavigator,
    [PATHS.InvoiceDrawer]: InvoiceNavigator
  },
  {
    initialRouteName: PATHS.CustomerDrawer,
    contentComponent: (props: any) => <SideBar {...props} />
  }
);

export default createAppContainer(MainNavigator);
