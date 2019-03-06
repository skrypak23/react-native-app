import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import * as CustomerActions from '../../../redux/customer/actions';
import ICustomer from '../../../shared/models/Customer';
import List from '../../../shared/components/List';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllCustomers: () => void;
  customers: ReadonlyArray<ICustomer>;
};

type Data = {
  key: string;
};

const listData = [
  { key: '1. element' },
  { key: '2. element' },
  { key: '3. element' },
  { key: '4. element' },
  { key: '5. element' },
  { key: '6. element' },
  { key: '7. element' },
  { key: '8. element' },
  { key: '9. element' },
  { key: '10. element' },
  { key: '11. element' },
  { key: '12. element' },
  { key: '13. element' }
];

class CustomerList extends List<Data> {}

class CustomerScreen extends Component<Props> {
  componentDidMount() {
    this.props.fetchAllCustomers();
  }

  render() {
    const { navigation, customers } = this.props;
    console.log(customers);
    return (
      <Container>
        <BaseHeader title="Customer" navigation={navigation} />
        <Content padder>
          <CustomerList data={listData} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ customers: state.customer.entities });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllCustomers: () => dispatch(CustomerActions.fetchCustomers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerScreen);
