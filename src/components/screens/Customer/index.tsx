import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, CardItem, Container, Content, Text, Right, Icon } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import * as CustomerActions from '../../../redux/customer/actions';
import ICustomer from '../../../shared/models/Customer';
import List from '../../../shared/components/List';
import RoundedButton from '../../../shared/components/RoundedButton';
import { ID } from '../../../shared/typing/records';
import PATHS from '../../../shared/paths';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllCustomers: () => void;
  customers: ReadonlyArray<ICustomer>;
  deleteCustomer: (id: ID) => void;
  fetchCustomer: (id: ID) => void;
  resetForm: () => void;
};

class CustomerScreen extends Component<Props> {
  componentDidMount() {
    this.props.fetchAllCustomers();
  }

  renderItem = (customer: ICustomer) => {
    const { navigation } = this.props;
    return (
      <Card style={{ width: '100%' }}>
        <CardItem>
          <Text>{customer.name}</Text>
          <Right>
            <Icon
              name="arrow-forward"
              onPress={() => navigation.navigate('CustomerDetail', { customer })}
            />
          </Right>
        </CardItem>
      </Card>
    );
  };

  handleDeleteCustomer = (customer: ICustomer) => this.props.deleteCustomer(customer._id);
  handleEditCustomer = (customer: ICustomer) => {
    const { fetchCustomer, navigation } = this.props;
    fetchCustomer(customer._id);
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
          <List<ICustomer>
            data={customers}
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

const mapStateToProps = (state: RootState) => ({ customers: state.customer.entities });
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
