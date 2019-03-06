import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import CustomerScreen from './Customer';
import ProductScreen from './Product';
import InvoiceScreen from './Invoice';
import SideBar from '../../shared/components/SideBar';
import PATHS from '../../shared/paths';

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

export default createAppContainer(MainNavigator);
