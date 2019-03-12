import React, { Component, FC, ReactNode } from 'react';
import { Input, Item, Picker } from 'native-base';
import { Field } from 'redux-form';
import { View, Text } from 'react-native';
import styles from './style';

type Props = {
  name: string;
};

class CustomPicker extends Component<Props> {
  renderPicker = ({
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
        {this.props.children}
      </Picker>
      {touched && error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );

  render() {
    const { name } = this.props;
    return (
      <Item>
        <Field name={name} component={this.renderPicker} />
      </Item>
    );
  }
}

export default CustomPicker;
