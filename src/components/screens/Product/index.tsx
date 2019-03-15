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
import { ProductEntity } from '../../../shared/typing/state';
import IProduct from '../../../shared/models/Product';
import { ID } from '../../../shared/typing/records';
import * as ProductActions from '../../../redux/product/actions';
import PATHS from '../../../shared/paths';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllProducts: () => void;
  products: ProductEntity;
  deleteProduct: (id: ID) => void;
  fetchProduct: (id: ID) => void;
  resetForm: () => void;
};

class ProductScreen extends Component<Props> {
  static navigationOptions = { header: null };
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  renderItem = (id: ID) => {
    const { navigation, products } = this.props;
    return (
      <CardData<IProduct>
        data={products.byId[id]}
        navigation={navigation}
        routeName={PATHS.ProductDetail}
      >
        <Text>{products.byId[id].name}</Text>
      </CardData>
    );
  };

  handleDeleteProduct = (id: ID) => this.props.deleteProduct(id);
  handleEditProduct = (id: ID) => {
    const { fetchProduct, navigation } = this.props;
    fetchProduct(id);
    navigation.navigate(PATHS.ProductForm, { isEdit: true });
  };
  handlePressButton = () => {
    const { resetForm, navigation } = this.props;
    resetForm();
    navigation.navigate(PATHS.ProductForm);
  };

  render() {
    const { navigation, products } = this.props;
    return (
      <Container>
        <BaseHeader title="Products" navigation={navigation} />
        <Content padder>
          <List<string>
            data={products.allIds}
            renderData={this.renderItem}
            onEdit={this.handleEditProduct}
            onDelete={this.handleDeleteProduct}
          />
        </Content>
        <RoundedButton onPress={this.handlePressButton} />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ products: state.product.entities });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllProducts: () => dispatch(ProductActions.fetchProducts()),
  fetchProduct: (id: ID) => dispatch(ProductActions.fetchProduct(id)),
  deleteProduct: (id: ID) => dispatch(ProductActions.deleteProduct(id)),
  resetForm: () => dispatch(ProductActions.resetProductLocal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductScreen);
