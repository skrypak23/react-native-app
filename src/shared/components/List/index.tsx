import React, { Component, PureComponent, ReactNode } from 'react';
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

function List<T>({ data, renderData, onEdit, onDelete }: Props<T>) {
  const renderSeparator = () => (
    <View style={styles.separatorViewStyle}>
      <View style={styles.separatorStyle} />
    </View>
  );

  const handleEdit = (item: T, index: number) => () => onEdit(item, index);
  const handleDelete = (item: T, index: number) => () => onDelete(item, index);

  const renderItem = (item: any, index: number) => (
    <ListItem
      onEdit={handleEdit(item, index)}
      onDelete={handleDelete(item, index)}
      render={renderData}
      data={item}
    />
  );

  const keyExtractor = (item: any, index: number) =>
    item._id ? `${item._id}` : `${index}`;

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={renderSeparator}
      renderItem={({ item, index }) => renderItem(item, index)}
      keyExtractor={keyExtractor}
    />
  );
}

export default List;
