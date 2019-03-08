import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, CardItem, Container, Content, Text, Right, Icon } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import List from '../../../shared/components/List';
import RoundedButton from '../../../shared/components/RoundedButton';
import * as ProductActions from '../../../redux/product/actions';
import IProduct from '../../../shared/models/Product';
import { ID } from '../../../shared/typing/records';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllProducts: () => void;
  products: ReadonlyArray<IProduct>;
  deleteProduct: (id: ID) => void;
};

class ProductScreen extends Component<Props> {
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  renderItem = (product: IProduct) => {
    const { navigation } = this.props;
    console.log('product', product);
    return product ? (
      <Card style={{ width: '100%' }}>
        <CardItem>
          <Text>{product.name}</Text>
          <Right>
            <Icon
              name="arrow-forward"
              onPress={() => navigation.navigate('ProductDetail', { product })}
            />
          </Right>
        </CardItem>
      </Card>
    ) : null;
  };

  handleDeleteProduct = (product: IProduct) => this.props.deleteProduct(product._id);
  handleEditProduct = () => {};
  handlePressButton = () => {};

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
  deleteProduct: (id: ID) => dispatch(ProductActions.deleteProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductScreen);
