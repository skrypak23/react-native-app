import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from 'react-native';
import { Card, CardItem, Container, Content } from 'native-base';
import GoBackButton from '../../../shared/components/GoBackButton';
import PATHS from '../../../shared/paths';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {};

class Detail extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: 'Product Details',
    headerLeft: <GoBackButton navigation={navigation} routeName={PATHS.Products} />
  });

  render() {
    const product = this.props.navigation.getParam('product');
    return product ? (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Name: {product.name}</Text>
            </CardItem>
            <CardItem header bordered>
              <Text>Price: {product.price}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    ) : null;
  }
}

export default Detail;
