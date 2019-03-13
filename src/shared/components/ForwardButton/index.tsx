import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Icon } from 'native-base';
import styles from './style';

type Props<T> = {
  navigation: NavigationScreenProp<any, any>;
  data: T;
  routeName: string;
};

function ForwardButton<T>({ navigation, data, routeName }: Props<T>) {
  return (
    <Button
      light
      style={styles.button}
      onPress={() => navigation.navigate(routeName, { data })}
    >
      <Icon name="arrow-forward" />
    </Button>
  );
}

export default ForwardButton;
