import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, CardItem, Container, Content, Text } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import List from '../../../shared/components/List';
import * as InvoiceActions from '../../../redux/invoice/actions';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import * as CustomerActions from '../../../redux/customer/actions';
import IInvoice from '../../../shared/models/Invoice';
import RoundedButton from '../../../shared/components/RoundedButton';
import { ID } from '../../../shared/typing/records';
import PATHS from '../../../shared/paths';
import ForwardButton from '../../../shared/components/ForwardButton';
import CardData from '../../../shared/components/Card';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllInvoices: () => void;
  invoices: ReadonlyArray<IInvoice>;
  deleteInvoice: (id: ID) => void;
  fetchCustomers: () => void;
  fetchInvoice: (id: ID) => void;
  fetchAllInvoiceItems: (invoiceId: ID) => void;
};

class InvoiceScreen extends Component<Props> {
  componentDidMount() {
    this.props.fetchAllInvoices();
    this.props.fetchCustomers();
  }

  renderItem = (invoice: IInvoice) => {
    const { navigation } = this.props;
    return (
      <CardData<IInvoice>
        data={invoice}
        routeName={PATHS.InvoiceDetail}
        navigation={navigation}
      >
        <Text>ID: {invoice._id}</Text>
      </CardData>
    );
  };

  handleDeleteInvoice = (invoice: IInvoice) => this.props.deleteInvoice(invoice._id);
  handleEditInvoice = (invoice: IInvoice) => {
    const { fetchInvoice, fetchAllInvoiceItems, navigation } = this.props;
    fetchInvoice(invoice._id);
    fetchAllInvoiceItems(invoice._id);
    navigation.navigate(PATHS.InvoiceForm, { isEdit: true });
  };
  handlePressButton = () => this.props.navigation.navigate(PATHS.InvoiceForm);

  render() {
    const { navigation, invoices } = this.props;
    return (
      <Container>
        <BaseHeader title="Invoices" navigation={navigation} />
        <Content padder>
          <List<IInvoice>
            data={invoices}
            renderData={this.renderItem}
            onEdit={this.handleEditInvoice}
            onDelete={this.handleDeleteInvoice}
          />
        </Content>
        <RoundedButton onPress={this.handlePressButton} />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  invoices: state.invoice.entities,
  customers: state.customer.entities,
  invoiceItems: state.invoiceItem.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllInvoices: () => dispatch(InvoiceActions.fetchInvoices()),
  fetchAllInvoiceItems: (invoiceId: ID) =>
    dispatch(InvoiceItemActions.fetchInvoiceItems(invoiceId)),
  fetchCustomers: () => dispatch(CustomerActions.fetchCustomers()),
  deleteInvoice: (id: ID) => dispatch(InvoiceActions.deleteInvoice(id)),
  fetchInvoice: (id: ID) => dispatch(InvoiceActions.fetchInvoice(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceScreen);
