import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from 'react-native';
import { Dispatch } from 'redux';
import { Card, CardItem, Container, Content, Tab, Tabs } from 'native-base';

import GoBackButton from '../../../shared/components/GoBackButton';

import { RootAction, RootState } from '../../../redux/store/types';
import IInvoice from '../../../shared/models/Invoice';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import {
  CustomerEntity,
  InvoiceItemEntity,
  ProductEntity
} from '../../../shared/typing/state';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import * as CustomerActions from '../../../redux/customer/actions';
import * as ProductActions from '../../../redux/product/actions';
import { ID } from '../../../shared/typing/records';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {
  customers: CustomerEntity;
  products: ProductEntity;
  invoiceItems: InvoiceItemEntity;
  fetchAllCustomers: () => void;
  fetchAllProducts: () => void;
  resetItems: () => void;
  fetchAllInvoiceItems: (invoiceId: ID) => void;
};

class Detail extends PureComponent<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: 'Invoice Details',
    headerLeft: <GoBackButton navigation={navigation} />
  });

  componentDidMount() {
    const invoice = this.props.navigation.getParam('data');
    invoice && this.props.fetchAllInvoiceItems(invoice._id);
    this.props.resetItems();
    this.props.fetchAllCustomers();
    this.props.fetchAllProducts();
  }

  renderInvoiceTab = (invoice: IInvoice | null) =>
    invoice ? (
      <Tab heading="Invoice">
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Customer: {this.props.customers.byId[invoice.customer_id].name}</Text>
            </CardItem>
            <CardItem header bordered>
              <Text>Discount: {invoice.discount || 0}</Text>
            </CardItem>
            <CardItem header bordered>
              <Text>Total: {invoice.total.toFixed(2)}</Text>
            </CardItem>
          </Card>
        </Content>
      </Tab>
    ) : null;

  renderInvoiceItemsTab = (invoiceItems: InvoiceItemEntity) =>
    invoiceItems ? (
      <Tab heading="Invoice Items">
        <Content padder>
          {invoiceItems.allIds.map((id, idx) => {
            const { products } = this.props;
            const item = invoiceItems.byId[id];
            const product = products.byId[item.product_id];
            return (
              <Card key={`${id}-${idx}`}>
                <CardItem>
                  <Text>Invoice ID: {item.invoice_id}</Text>
                </CardItem>
                <CardItem>
                  <Text>Product: {product ? product.name : null}</Text>
                </CardItem>
                <CardItem>
                  <Text>Quantity: {item.quantity}</Text>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Tab>
    ) : null;

  render() {
    const invoice = this.props.navigation.getParam('data');
    const { invoiceItems } = this.props;
    return invoice ? (
      <Container>
        <Tabs>
          {this.renderInvoiceTab(invoice)}
          {this.renderInvoiceItemsTab(invoiceItems)}
        </Tabs>
      </Container>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => ({
  customers: state.customer.entities,
  products: state.product.entities,
  invoiceItems: state.invoiceItem.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllCustomers: () => dispatch(CustomerActions.fetchCustomers()),
  fetchAllProducts: () => dispatch(ProductActions.fetchProducts()),
  fetchAllInvoiceItems: (invoiceId: ID) =>
    dispatch(InvoiceItemActions.fetchInvoiceItems(invoiceId)),
  resetItems: () => dispatch(InvoiceItemActions.resetInvoiceItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
