import React, { FC } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Icon } from 'native-base';
import styles from './style';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const GoBackButton: FC<Props> = ({ navigation }) => (
  <Button onPress={() => navigation.goBack()} transparent style={styles.button}>
    <Icon name="md-arrow-round-back" />
  </Button>
);

export default GoBackButton;
