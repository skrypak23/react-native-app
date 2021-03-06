import React, { FC } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { Container, Content, Form, Button } from 'native-base';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { NavigationScreenProp } from 'react-navigation';

import FormItem from '../../FormItem';

import { RootAction, RootState } from '../../../../redux/store/types';
import IProduct from '../../../models/Product';
import * as ProductActions from '../../../../redux/product/actions';
import PATHS from '../../../paths';
import { ID } from '../../../typing/records';
import styles from './style';

const validate = (values: IProduct) => {
  const errors = {} as any;
  if (!values.name || !values.name.trim()) {
    errors.name = 'name is required';
  }
  if (!values.price || !Number(values.price)) {
    errors.price = 'price is required';
  }
  return errors;
};

type Props = InjectedFormProps & {
  createProduct: (product: IProduct) => void;
  editProduct: (id: ID, product: IProduct) => void;
  navigation: NavigationScreenProp<any, any>;
  initialValues: IProduct;
};
const BaseForm: FC<Props> = ({
  handleSubmit,
  createProduct,
  editProduct,
  navigation,
  initialValues,
  valid
}) => {
  const onSubmit = (values: any) => {
    const isEdit = navigation.getParam('isEdit', false);
    const price = Number(values.price);
    isEdit
      ? editProduct(initialValues!._id, { ...values, price })
      : createProduct({ ...values, price });
    navigation.navigate(PATHS.Products);
  };

  return (
    <Container>
      <Content>
        <Form style={styles.form}>
          <FormItem name="name" placeholder="Name" type="default" />
          <FormItem name="price" placeholder="Price" type="decimal-pad" />
        </Form>
        <Button block primary onPress={handleSubmit(onSubmit)} disabled={!valid}>
          <Text style={styles.button}>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  initialValues: state.request.product.fetchById.data
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  createProduct: (product: IProduct) => dispatch(ProductActions.createProduct(product)),
  editProduct: (id: ID, product: IProduct) =>
    dispatch(ProductActions.editProduct(id, product))
});

export default compose<any, any, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'product', validate })
)(BaseForm);
