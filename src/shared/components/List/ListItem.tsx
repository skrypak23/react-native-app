import React, { memo, PureComponent, ReactNode } from 'react';
import Swipe from 'react-native-swipeout';
import { Button, Card, Icon } from 'native-base';
import styles from './style';

type Props<T> = {
  onEdit: () => void;
  onDelete: () => void;
  render: (data: T) => ReactNode;
  data: T;
};
class ListItem<T> extends PureComponent<Props<T>> {
  buttons = [
    {
      component: (
        <Button block info style={styles.button} onPress={this.props.onEdit}>
          <Icon name="md-document" style={styles.icon} />
        </Button>
      )
    },
    {
      component: (
        <Button danger style={styles.button} onPress={this.props.onDelete}>
          <Icon name="trash" style={styles.icon} />
        </Button>
      )
    }
  ];
  render() {
    const { data, render } = this.props;
    return (
      <Card style={styles.card}>
        <Swipe right={this.buttons} backgroundColor="#fff">
          {render(data)}
        </Swipe>
      </Card>
    );
  }
}

export default ListItem;
