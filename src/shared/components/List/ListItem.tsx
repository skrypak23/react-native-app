import React, { PureComponent, ReactNode } from 'react';
import {
  View,
  Animated,
  Dimensions,
  PanResponder,
  PanResponderInstance
} from 'react-native';
import { Button, Icon } from 'native-base';
import styles from './style';

type Props<T> = {
  setScrollEnabled: (enabled: boolean) => void;
  renderItem: (data: T) => ReactNode;
  data: T;
  index: number;
  isEdit?: boolean;
  onEdit: (data: T, index?: number) => void;
  onDelete: (data: T, index?: number) => void;
};
type State = {
  position: Animated.ValueXY;
};

const WIDTH = Dimensions.get('window').width;

class ListItem<T> extends PureComponent<Props<T>, State> {
  private readonly gestureDelay: number;
  private scrollViewEnabled: boolean;
  private panResponder: PanResponderInstance;

  constructor(props: Props<T>) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => false,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderTerminationRequest: (event, gestureState) => false,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          const x = gestureState.dx + this.gestureDelay;
          position.setValue({ x, y: 0 });
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 150
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: { x: WIDTH, y: 0 },
            duration: 300
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        }
      }
    });

    this.state = { position };
  }

  setScrollViewEnabled(enabled: boolean) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  handleDelete = () => this.props.onDelete(this.props.data, this.props.index);
  handleEdit = () => this.props.onEdit(this.props.data, this.props.index);

  render() {
    return (
      <View style={styles.listItem}>
        <Animated.View
          style={[this.state.position.getLayout()]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.absoluteCell}>
            <Button block info style={styles.button} onPress={this.handleEdit}>
              <Icon name="md-document" style={styles.icon} />
            </Button>
            <Button
              danger
              style={styles.button}
              onPress={this.handleDelete}
            >
              <Icon name="trash" style={styles.icon} />
            </Button>
          </View>
          <View style={styles.innerCell}>{this.props.renderItem(this.props.data)}</View>
        </Animated.View>
      </View>
    );
  }
}

export default ListItem;
