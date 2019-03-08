import React, { FC } from 'react';
import { Input, Item } from 'native-base';
import { Field } from 'redux-form';
import { View, Text } from 'react-native';
import styles from './style';

type KeyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';

type Props = {
  name: string;
  placeholder: string;
  type: KeyboardType;
};

const FormItem: FC<Props> = ({ name, placeholder, type }) => {
  const renderInput = ({
    input: { onChange, value, ...restInput },
    meta: { touched, error },
    ...rest
  }: any) => (
    <View style={styles.item}>
      <Input
        onChange={onChange}
        {...restInput}
        {...rest}
        keyboardType={type}
        value={`${value}`}
      />
      {touched && error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );

  return (
    <Item>
      <Field name={name} component={renderInput} placeholder={placeholder} />
    </Item>
  );
};

export default FormItem;
