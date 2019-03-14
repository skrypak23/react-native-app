import React, { ReactNode } from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import ListItem from './ListItem';
import styles from './style';

type Props<T> = {
  data: ReadonlyArray<T>;
  renderData: (data: T) => ReactNode;
  onEdit: (data: T, index?: number) => void;
  onDelete: (data: T, index?: number) => void;
  isEdit?: boolean;
};

const ITEM_HEIGHT = 70;

function List<T>({ data, renderData, onEdit, onDelete }: Props<T>) {
  const renderSeparator = () => (
    <View style={styles.separatorViewStyle}>
      <View style={styles.separatorStyle} />
    </View>
  );

  const handleEdit = (item: T, index: number) => () => onEdit(item, index);
  const handleDelete = (item: T, index: number) => () => onDelete(item, index);

  const renderItem = ({ item, index }: ListRenderItemInfo<T>) => (
    <ListItem<T>
      onEdit={handleEdit(item, index)}
      onDelete={handleDelete(item, index)}
      render={renderData}
      data={item}
    />
  );

  const keyExtractor = (item: any, index: number) =>
    item._id ? `${item._id}` : `${index}`;
  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  });

  return (
    <FlatList
      data={data}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}

export default List;
