import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, CardItem, Container, Content, Text, Right, Icon } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import List from '../../../shared/components/List';
import * as InvoiceActions from '../../../redux/invoice/actions';
import IInvoice from '../../../shared/models/Invoice';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllInvoices: () => void;
  invoices: ReadonlyArray<IInvoice>;
};

class InvoiceScreen extends Component<Props> {
  componentDidMount() {
    this.props.fetchAllInvoices();
  }

  renderItem = (invoice: IInvoice) => {
    const { navigation } = this.props;
    return (
      <Card style={{ width: '100%' }}>
        <CardItem>
          <Text>Customer ID {invoice.customer_id}</Text>
          <Right>
            <Icon
              name="arrow-forward"
              onPress={() => navigation.navigate('InvoiceDetail', { invoice })}
            />
          </Right>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { navigation, invoices } = this.props;
    console.log(invoices);
    return (
      <Container>
        <BaseHeader title="Invoices" navigation={navigation} />
        <Content padder>
          <List<IInvoice> data={invoices} renderData={this.renderItem} />
        </Content>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceScreen);
