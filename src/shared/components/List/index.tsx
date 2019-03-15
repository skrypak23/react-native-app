import React, { ReactNode } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import ListItem from './ListItem';
import styles from './style';

type Props<T> = {
  data: ReadonlyArray<T>;
  renderData: (data: T) => ReactNode;
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
  isEdit?: boolean;
};

const ITEM_HEIGHT = 70;

function List<T>({ data, renderData, onEdit, onDelete }: Props<T>) {
  const renderSeparator = () => (
    <View style={styles.separatorViewStyle}>
      <View style={styles.separatorStyle} />
    </View>
  );

  const handleEdit = (item: T) => () => onEdit(item);
  const handleDelete = (item: T) => () => onDelete(item);

  const renderItem = ({ item }: ListRenderItemInfo<T>) => (
    <ListItem<T>
      onEdit={handleEdit(item)}
      onDelete={handleDelete(item)}
      render={renderData}
      data={item}
    />
  );

  const keyExtractor = (item: any, index: number) =>
    typeof item === 'string' ? item : `${index}`;
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
