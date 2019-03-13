import React, { ReactNode } from 'react';
import { CardItem, Card } from 'native-base';
import ForwardButton from '../ForwardButton';
import PATHS from '../../paths';
import { NavigationScreenProp } from 'react-navigation';
import styles from './style';

type Props<T> = {
  data: T;
  routeName: string;
  navigation: NavigationScreenProp<any, any>;
  children: ReactNode;
};
function CardData<T>({ data, children, navigation, routeName }: Props<T>) {
  return (
    <Card style={styles.card}>
      <CardItem>
        {children}
        <ForwardButton<T> navigation={navigation} data={data} routeName={routeName} />
      </CardItem>
    </Card>
  );
}
export default CardData;
