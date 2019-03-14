import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { ProductForm } from '../../../shared/components/ManageForm';
import GoBackButton from '../../../shared/components/GoBackButton';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {};

class CreateProduct extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: navigation.getParam('isEdit') ? 'Edit Product' : 'Create Product',
    headerLeft: <GoBackButton navigation={navigation} />
  });
  render() {
    const { navigation } = this.props;
    return <ProductForm navigation={navigation} />;
  }
}

export default CreateProduct;
