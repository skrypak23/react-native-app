import React, {Component, PureComponent, ReactNode} from 'react';
import { FlatList, View } from 'react-native';
import ListItem from './ListItem';
import styles from './style';

type Props<T> = {
  data: ReadonlyArray<T>;
  renderData: (data: T) => ReactNode;
  onEdit: (data: T, index?: number) => void;
  onDelete: (data: T, index?: number) => void;
  isEdit?: boolean;
};

type State<T> = {
  enabled: boolean;
  data: ReadonlyArray<T>;
};

export default class List<T> extends PureComponent<Props<T>, State<T>> {
  state: State<T> = {
    enabled: true,
    data: this.props.data
  };

  renderSeparator = () => (
    <View style={styles.separatorViewStyle}>
      <View style={styles.separatorStyle} />
    </View>
  );

  setScrollEnabled = (enabled: boolean) => this.setState({ enabled });

  renderItem(item: any, index: number) {
    const { onEdit, onDelete, isEdit } = this.props;
    return (
      <ListItem<T>
        data={item}
        key={item._id}
        index={index}
        isEdit={isEdit}
        setScrollEnabled={this.setScrollEnabled}
        renderItem={this.props.renderData}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  keyExtractor = (item: any, index: number) => (item._id ? `${item._id}` : `${index}`);

  render() {
    return (
      <FlatList
        data={this.props.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        scrollEnabled={this.state.enabled}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}
