import React, { FC } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text } from 'native-base';
import BaseHeader from '../../../shared/components/Header';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const ProductScreen: FC<Props> = ({ children, navigation }) => (
  <Container>
    <BaseHeader title="Product" navigation={navigation} />
    <Content padder>
      <Text>Product</Text>
    </Content>
  </Container>
);

export default ProductScreen;
