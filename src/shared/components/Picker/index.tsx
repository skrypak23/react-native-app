import React, { FC, memo } from 'react';
import { Item, Picker } from 'native-base';
import { Field } from 'redux-form';
import { View, Text } from 'react-native';
import styles from './style';

type Props = {
  name: string;
};

const CustomPicker: FC<Props> = memo(({ name, children }) => {
  const renderPicker = ({
    input: { onChange, value, ...restInput },
    meta: { touched, error },
    ...rest
  }: any) => (
    <View style={styles.item}>
      <Picker
        note
        mode="dropdown"
        style={{ width: 320 }}
        selectedValue={value}
        onValueChange={onChange}
        {...restInput}
        {...rest}
      >
        {children}
      </Picker>
      {touched && error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );

  return (
    <Item>
      <Field name={name} component={renderPicker} />
    </Item>
  );
});

export default CustomPicker;
