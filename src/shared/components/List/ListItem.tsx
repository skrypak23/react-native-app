import React, { ReactNode } from 'react';
import Swipe from 'react-native-swipeout';
import { Button, Card, Icon } from 'native-base';
import styles from './style';

type Props<T> = {
  onEdit: () => void;
  onDelete: () => void;
  render: (data: T) => ReactNode;
  data: T;
};
function ListItem<T>({ data, onEdit, onDelete, render }: Props<T>) {
  const buttons = [
    {
      component: (
        <Button block info style={styles.button} onPress={onEdit}>
          <Icon name="md-document" style={styles.icon} />
        </Button>
      )
    },
    {
      component: (
        <Button danger style={styles.button} onPress={onDelete}>
          <Icon name="trash" style={styles.icon} />
        </Button>
      )
    }
  ];

  return (
    <Card style={styles.card}>
      <Swipe right={buttons} backgroundColor="#fff">
        {render(data)}
      </Swipe>
    </Card>
  );
}
export default ListItem;
