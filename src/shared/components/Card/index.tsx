import React, { ReactNode } from 'react';
import { CardItem } from 'native-base';
import ForwardButton from '../ForwardButton';
import { NavigationScreenProp } from 'react-navigation';

type Props<T> = {
  data: T;
  routeName: string;
  navigation: NavigationScreenProp<any, any>;
  children: ReactNode;
};
function CardData<T>({ data, children, navigation, routeName }: Props<T>) {
  return (
    <CardItem>
      {children}
      <ForwardButton<T> navigation={navigation} data={data} routeName={routeName} />
    </CardItem>
  );
}
export default CardData;
