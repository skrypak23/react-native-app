import React, { FC } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  title: string;
};

const BaseHeader: FC<Props> = ({ navigation, title }) => (
  <Header>
    <Left>
      <Button transparent onPress={() => navigation.openDrawer()}>
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
);

export default BaseHeader;
