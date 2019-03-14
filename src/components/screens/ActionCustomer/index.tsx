import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { CustomerForm } from '../../../shared/components/ManageForm';
import GoBackButton from '../../../shared/components/GoBackButton';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {};

class CreateCustomer extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: 'Create Customer',
    headerLeft: <GoBackButton navigation={navigation} />
  });
  render() {
    const { navigation } = this.props;
    return <CustomerForm navigation={navigation} />;
  }
}

export default CreateCustomer;
