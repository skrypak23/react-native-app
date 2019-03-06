import React, { FC } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text } from 'native-base';
import BaseHeader from '../../../shared/components/Header';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const InvoiceScreen: FC<Props> = ({ children, navigation }) => (
  <Container>
    <BaseHeader title="Invoice" navigation={navigation} />
    <Content padder>
      <Text>Invoice</Text>
    </Content>
  </Container>
);

export default InvoiceScreen;
