import React, { FC } from 'react';
import { Button, Icon } from 'native-base';
import styles from './style';

type Props = {
  onPress: () => void;
};

const RoundedButton: FC<Props> = ({ onPress }) => (
  <Button iconLeft danger style={styles.button} rounded onPress={onPress}>
    <Icon type="FontAwesome" name="plus" style={styles.icon}/>
  </Button>
);

export default RoundedButton;
