import React, { FC } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Icon } from 'native-base';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  routeName: string;
};

const GoBackButton: FC<Props> = ({ navigation, routeName }) => (
  <Button
    onPress={() => navigation.navigate(routeName)}
    transparent
    style={{ height: '100%' }}
  >
    <Icon name="md-arrow-round-back" />
  </Button>
);

export default GoBackButton;
