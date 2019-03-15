import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { CustomerForm } from '../../../shared/components/ManageForm';
import GoBackButton from '../../../shared/components/GoBackButton';

import {NavigationProps} from "../../../shared/typing/common";

type TNavigation = {
  navigation: NavigationScreenProp<NavigationProps>;
};

type Props = TNavigation & {};

class CreateCustomer extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: navigation.getParam('isEdit') ? 'Edit Customer' : 'Create Customer',
    headerLeft: <GoBackButton navigation={navigation} />
  });
  render() {
    const { navigation } = this.props;
    return <CustomerForm navigation={navigation} />;
  }
}

export default CreateCustomer;
