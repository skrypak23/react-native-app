import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import List from '../../../shared/components/List';
import RoundedButton from '../../../shared/components/RoundedButton';
import * as ProductActions from '../../../redux/product/actions';
import IProduct from '../../../shared/models/Product';
import { ID } from '../../../shared/typing/records';
import PATHS from '../../../shared/paths';
import CardData from '../../../shared/components/Card';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllProducts: () => void;
  products: ReadonlyArray<IProduct>;
  deleteProduct: (id: ID) => void;
  fetchProduct: (id: ID) => void;
  resetForm: () => void;
};

class ProductScreen extends Component<Props> {
  static navigationOptions = { header: null };
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  renderItem = (product: IProduct) => {
    const { navigation } = this.props;
    return product ? (
      <CardData<IProduct>
        data={product}
        navigation={navigation}
        routeName={PATHS.ProductDetail}
      >
        <Text>{product.name}</Text>
      </CardData>
    ) : null;
  };

  handleDeleteProduct = (product: IProduct) => this.props.deleteProduct(product._id);
  handleEditProduct = (product: IProduct) => {
    const { fetchProduct, navigation } = this.props;
    fetchProduct(product._id);
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
          <List<IProduct>
            data={products}
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
