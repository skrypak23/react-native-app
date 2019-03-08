import React, { Component, ReactNode } from 'react';
import { FlatList, View } from 'react-native';
import ListItem from './ListItem';
import styles from './style';

type Props<T> = {
  data: ReadonlyArray<T>;
  renderData: (data: T) => ReactNode;
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
};

type State<T> = {
  enabled: boolean;
  data: ReadonlyArray<T>;
};

export default class List<T> extends Component<Props<T>, State<T>> {
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

  renderItem(item: any) {
    const { onEdit, onDelete } = this.props;
    return (
      <ListItem<T>
        data={item}
        key={item._id}
        setScrollEnabled={this.setScrollEnabled}
        renderItem={this.props.renderData}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  keyExtractor = (item: any) => `${item._id}`;

  render() {
    return (
      <FlatList
        data={this.props.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => this.renderItem(item)}
        scrollEnabled={this.state.enabled}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}
