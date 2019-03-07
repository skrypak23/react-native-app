import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, CardItem, Container, Content, Text, Right, Icon } from 'native-base';
import BaseHeader from '../../../shared/components/Header';
import { RootAction, RootState } from '../../../redux/store/types';
import List from '../../../shared/components/List';
import * as ProductActions from '../../../redux/product/actions';
import IProduct from '../../../shared/models/Product';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  fetchAllProducts: () => void;
  products: ReadonlyArray<IProduct>;
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

  render() {
    const { navigation, products } = this.props;
    return (
      <Container>
        <BaseHeader title="Products" navigation={navigation} />
        <Content padder>
          <List<IProduct> data={products} renderData={this.renderItem} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ products: state.product.entities });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllProducts: () => dispatch(ProductActions.fetchProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductScreen);
