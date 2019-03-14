import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';
import { InvoiceForm, InvoiceItemForm } from '../../../shared/components/ManageForm';
import GoBackButton from '../../../shared/components/GoBackButton';
import { Tab, Tabs } from 'native-base';
import { RootAction } from '../../../redux/store/types';
import { InvoiceRequest } from '../../../redux/request/actions';
import * as ProductActions from '../../../redux/product/actions';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {
  fetchAllProducts: () => void;
  resetItems: () => void;
  resetInvoice: () => void;
};

class CreateInvoice extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: navigation.getParam('isEdit') ? 'Edit Invoice' : 'Create Invoice',
    headerLeft: <GoBackButton navigation={navigation} />
  });

  componentDidMount() {
    this.props.resetItems();
    this.props.resetInvoice();
    this.props.fetchAllProducts();
  }

  render() {
    const { navigation } = this.props;
    return (
      <Tabs locked={true}>
        <Tab heading="Invoice Form">
          <InvoiceForm navigation={navigation} />
        </Tab>
        <Tab heading="Invoice Item Form">
          <InvoiceItemForm navigation={navigation} />
        </Tab>
      </Tabs>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllProducts: () => dispatch(ProductActions.fetchProducts()),
  resetItems: () => dispatch(InvoiceItemActions.resetInvoiceItems()),
  resetInvoice: () => dispatch(InvoiceRequest.Action.resetInvoice())
});

export default connect(
  null,
  mapDispatchToProps
)(CreateInvoice);
