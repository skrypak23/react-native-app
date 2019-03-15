import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text } from 'native-base';

import BaseHeader from '../../../shared/components/Header';
import List from '../../../shared/components/List';
import RoundedButton from '../../../shared/components/RoundedButton';
import CardData from '../../../shared/components/Card';

import { RootAction, RootState } from '../../../redux/store/types';
import { CustomerEntity } from '../../../shared/typing/state';
import ICustomer from '../../../shared/models/Customer';
import * as CustomerActions from '../../../redux/customer/actions';
import { ID } from '../../../shared/typing/records';
import PATHS from '../../../shared/paths';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllCustomers: () => void;
  customers: CustomerEntity;
  deleteCustomer: (id: ID) => void;
  fetchCustomer: (id: ID) => void;
  resetForm: () => void;
};

class CustomerScreen extends Component<Props> {
  static navigationOptions = { header: null };
  componentDidMount() {
    this.props.fetchAllCustomers();
  }

  renderItem = (id: ID) => {
    const { navigation, customers } = this.props;
    const customer = customers.byId[id];
    return (
      <CardData<ICustomer>
        data={customer}
        navigation={navigation}
        routeName={PATHS.CustomerDetail}
      >
        <Text>{customer.name}</Text>
      </CardData>
    );
  };

  handleDeleteCustomer = (id: ID) => this.props.deleteCustomer(id);
  handleEditCustomer = (id: ID) => {
    const { fetchCustomer, navigation } = this.props;
    fetchCustomer(id);
    navigation.navigate(PATHS.CustomerForm, { isEdit: true });
  };
  handlePressButton = () => {
    const { resetForm, navigation } = this.props;
    resetForm();
    navigation.navigate(PATHS.CustomerForm);
  };

  render() {
    const { navigation, customers } = this.props;
    return (
      <Container>
        <BaseHeader title="Customers" navigation={navigation} />
        <Content padder>
          <List<string>
            data={customers.allIds}
            renderData={this.renderItem}
            onEdit={this.handleEditCustomer}
            onDelete={this.handleDeleteCustomer}
          />
        </Content>
        <RoundedButton onPress={this.handlePressButton} />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  customers: state.customer.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllCustomers: () => dispatch(CustomerActions.fetchCustomers()),
  deleteCustomer: (id: ID) => dispatch(CustomerActions.deleteCustomer(id)),
  fetchCustomer: (id: ID) => dispatch(CustomerActions.fetchCustomer(id)),
  resetForm: () => dispatch(CustomerActions.resetCustomerLocal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerScreen);
