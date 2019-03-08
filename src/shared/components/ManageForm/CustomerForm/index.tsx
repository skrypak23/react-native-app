import React, { FC } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Button } from 'native-base';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch, compose } from 'redux';
import FormItem from '../../FormItem';
import { RootAction, RootState } from '../../../../redux/store/types';
import * as CustomerActions from '../../../../redux/customer/actions';
import ICustomer from '../../../models/Customer';
import PATHS from '../../../paths';
import styles from './style';
import { ID } from '../../../typing/records';

const validate = (values: ICustomer) => {
  const errors = {} as any;
  if (!values.name || !values.name.trim()) {
    errors.name = 'name is required';
  }
  if (!values.phone || !values.phone.trim()) {
    errors.phone = 'phone is required';
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
  initialValues
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
          <FormItem name="name" placeholder="Name" type="default"/>
          <FormItem name="phone" placeholder="Phone" type="phone-pad"/>
          <FormItem name="address" placeholder="Address" type="default"/>
        </Form>
        <Button block primary onPress={handleSubmit(onSubmit)}>
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'customer', validate })
)(BaseForm);
