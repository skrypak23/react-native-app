import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './ListItem';

interface Props<T> {
  data: T[];
}

export default class List<T> extends Component<Props<T>, any> {
  state = {
    enable: true,
    data: this.props.data
  };

  renderSeparator = () => {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  };

  success(key: any) {
    const data = this.state.data.filter((item: any) => item.key !== key);
    this.setState({
      data
    });
  }

  setScrollEnabled = (enable: boolean) => {
    this.setState({
      enable
    });
  };

  renderItem(item: any) {
    return (
      <ListItem
        text={item.key}
        success={this.success}
        setScrollEnabled={(enable: boolean) => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => this.renderItem(item)}
        scrollEnabled={this.state.enable}
      />
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000'
  }
});
