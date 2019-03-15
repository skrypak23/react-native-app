import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text } from 'native-base';

import BaseHeader from '../../../shared/components/Header';
import RoundedButton from '../../../shared/components/RoundedButton';
import CardData from '../../../shared/components/Card';
import List from '../../../shared/components/List';

import { RootAction, RootState } from '../../../redux/store/types';
import IInvoice from '../../../shared/models/Invoice';
import { InvoiceEntity } from '../../../shared/typing/state';
import * as InvoiceActions from '../../../redux/invoice/actions';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import * as CustomerActions from '../../../redux/customer/actions';
import { ID } from '../../../shared/typing/records';
import PATHS from '../../../shared/paths';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllInvoices: () => void;
  invoices: InvoiceEntity;
  deleteInvoice: (id: ID) => void;
  fetchCustomers: () => void;
  fetchInvoice: (id: ID) => void;
  fetchAllInvoiceItems: (invoiceId: ID) => void;
};

class InvoiceScreen extends Component<Props> {
  static navigationOptions = { header: null };
  componentDidMount() {
    this.props.fetchAllInvoices();
    this.props.fetchCustomers();
  }

  renderItem = (id: ID) => {
    const { navigation, invoices } = this.props;
    return (
      <CardData<IInvoice>
        data={invoices.byId[id]}
        routeName={PATHS.InvoiceDetail}
        navigation={navigation}
      >
        <Text>ID: {id}</Text>
      </CardData>
    );
  };

  handleDeleteInvoice = (id: ID) => this.props.deleteInvoice(id);
  handleEditInvoice = (id: ID) => {
    const { fetchInvoice, fetchAllInvoiceItems, navigation } = this.props;
    fetchInvoice(id);
    fetchAllInvoiceItems(id);
    navigation.navigate(PATHS.InvoiceForm, { isEdit: true });
  };
  handlePressButton = () => this.props.navigation.navigate(PATHS.InvoiceForm);

  render() {
    const { navigation, invoices } = this.props;
    return (
      <Container>
        <BaseHeader title="Invoices" navigation={navigation} />
        <Content padder>
          <List<string>
            data={invoices.allIds}
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
