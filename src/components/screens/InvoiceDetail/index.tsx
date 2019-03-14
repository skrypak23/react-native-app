import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from 'react-native';
import { Dispatch } from 'redux';
import { Card, CardItem, Container, Content, Tab, Tabs } from 'native-base';
import GoBackButton from '../../../shared/components/GoBackButton';
import IInvoice from '../../../shared/models/Invoice';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import * as CustomerActions from '../../../redux/customer/actions';
import * as ProductActions from '../../../redux/product/actions';
import { RootAction, RootState } from '../../../redux/store/types';
import { ID } from '../../../shared/typing/records';
import { findData } from '../../../shared/utils';
import ICustomer from '../../../shared/models/Customer';
import IProduct from '../../../shared/models/Product';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {
  customers: ReadonlyArray<ICustomer>;
  products: ReadonlyArray<IProduct>;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  fetchAllCustomers: () => void;
  fetchAllProducts: () => void;
  resetItems: () => void;
  fetchAllInvoiceItems: (invoiceId: ID) => void;
};

class Detail extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: 'Invoice Details',
    headerLeft: <GoBackButton navigation={navigation} />
  });

  componentDidMount() {
    this.props.resetItems();
    const invoice = this.props.navigation.getParam('data');
    this.props.fetchAllCustomers();
    this.props.fetchAllProducts();
    invoice && this.props.fetchAllInvoiceItems(invoice._id);
  }

  renderInvoiceTab = (invoice: IInvoice | null) =>
    invoice ? (
      <Tab heading="Invoice">
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>
                Customer: {findData(this.props.customers, invoice.customer_id).name}
              </Text>
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

  renderInvoiceItemsTab = (invoiceItems: ReadonlyArray<IInvoiceItem> | null) =>
    invoiceItems ? (
      <Tab heading="Invoice Items">
        <Content padder>
          {invoiceItems.map((item, idx) => (
            <Card key={`${item._id}-${idx}`}>
              <CardItem>
                <Text>Invoice ID: {item.invoice_id}</Text>
              </CardItem>
              <CardItem>
                <Text>
                  Product: {findData(this.props.products, item.product_id).name}
                </Text>
              </CardItem>
              <CardItem>
                <Text>Quantity: {item.quantity}</Text>
              </CardItem>
            </Card>
          ))}
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
