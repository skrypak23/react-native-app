import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from 'react-native';
import { Container, Content, Form, Button } from 'native-base';
import { InjectedFormProps, reduxForm } from 'redux-form';

import FormItem from '../../FormItem';

import { RootAction, RootState } from '../../../../redux/store/types';
import * as CustomerActions from '../../../../redux/customer/actions';
import ICustomer from '../../../models/Customer';
import PATHS from '../../../paths';
import { ID } from '../../../typing/records';
import styles from './style';

const validate = (values: ICustomer) => {
  const errors = {} as any;
  if (!values.name || !values.name.trim()) {
    errors.name = 'name is required';
  }
  if (!values.phone || !values.phone.match(/^((\+38)+([0-9]){10})$/)) {
    errors.phone = 'invalid phone number';
  }
  if (!values.address || !values.address.trim()) {
    errors.address = 'address is required';
  }
  return errors;
};

type Props = InjectedFormProps & {
  createCustomer: (customer: ICustomer) => void;
  editCustomer: (id: ID, customer: ICustomer) => void;
  navigation: NavigationScreenProp<any, any>;
  initialValues: ICustomer | null;
};
const BaseForm: FC<Props> = ({
  handleSubmit,
  createCustomer,
  editCustomer,
  navigation,
  initialValues,
  valid
}) => {
  const onSubmit = (values: any) => {
    const isEdit = navigation.getParam('isEdit', false);
    isEdit ? editCustomer(initialValues!._id, values) : createCustomer(values);
    navigation.navigate(PATHS.Customers);
  };

  return (
    <Container>
      <Content>
        <Form style={styles.form}>
          <FormItem name="name" placeholder="Name" type="default" />
          <FormItem name="phone" placeholder="+380999999999" type="phone-pad" />
          <FormItem name="address" placeholder="Address" type="default" />
        </Form>
        <Button block primary onPress={handleSubmit(onSubmit)} disabled={!valid}>
          <Text style={styles.button}>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  initialValues: state.request.customer.fetchById.data
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  createCustomer: (customer: ICustomer) =>
    dispatch(CustomerActions.createCustomer(customer)),
  editCustomer: (id: ID, customer: ICustomer) =>
    dispatch(CustomerActions.editCustomer(id, customer))
});

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'customer', validate })
)(BaseForm);
