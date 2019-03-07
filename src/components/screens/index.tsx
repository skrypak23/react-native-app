import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import CustomerScreen from './Customer';
import ProductScreen from './Product';
import InvoiceScreen from './Invoice';
import SideBar from '../../shared/components/SideBar';
import PATHS from '../../shared/paths';
import CustomerDetailScreen from './CustomerDetail';
import ProductDetailScreen from './ProductDetail';
import InvoiceDetailScreen from './InvoiceDetail';

const StackNavigator = createStackNavigator({
  [PATHS.CustomerDetail]: CustomerDetailScreen,
  [PATHS.ProductDetail]: ProductDetailScreen,
  [PATHS.InvoiceDetail]: InvoiceDetailScreen
});

const MainNavigator = createDrawerNavigator(
  {
    [PATHS.Customers]: CustomerScreen,
    [PATHS.Products]: ProductScreen,
    [PATHS.Invoices]: InvoiceScreen
  },
  {
    initialRouteName: PATHS.Customers,
    contentComponent: (props: any) => <SideBar {...props} />
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    [PATHS.Drawer]: MainNavigator,
    [PATHS.Detail]: StackNavigator
  },
  { initialRouteName: PATHS.Drawer }
);

export default createAppContainer(SwitchNavigator);
