import React, { FC } from 'react';
import { Text, View, Modal } from 'react-native';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Picker as BasePicker, Button, Form, Icon } from 'native-base';
import { RootAction, RootState } from '../../../../redux/store/types';
import Picker from '../../Picker';
import FormItem from '../../FormItem';
import IProduct from '../../../models/Product';
import IInvoiceItem from '../../../models/InvoiceItem';
import * as InvoiceItemAction from '../../../../redux/invoice-item/actions';
import styles from './style';

type Props = InjectedFormProps & {
  products: ReadonlyArray<IProduct>;
  initialValues: IInvoiceItem;
  editLocal: (index: number, invoiceItem: IInvoiceItem) => void;
  editInvoiceItem: (index: number, invoiceItem: IInvoiceItem) => void;
  onChangeVisible: (visible: boolean) => void;
  resetForm: () => void;
  visible: boolean;
};

const validate = (values: IInvoiceItem) => {
  const errors = {} as any;
  if (!values.product_id) {
    errors.name = 'product is required';
  }
  if (!values.quantity) {
    errors.quantity = 'quantity is required';
  }
  return errors;
};

const ItemsForm: FC<Props> = ({
  products,
  handleSubmit,
  initialValues,
  editInvoiceItem,
  onChangeVisible,
  visible,
  valid,
  resetForm
}) => {
  const onSubmit = (values: any) => {
    const quantity = Number(values.quantity);
    editInvoiceItem(values.index, { ...values, quantity });
    onChangeVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible && Boolean(initialValues)}
      onRequestClose={() => resetForm()}
    >
      <View style={styles.container}>
        <Form>
          <Picker name="product_id">
            {products.map(product => (
              <BasePicker.Item
                key={product._id}
                label={`Name: ${product.name}, price - ${product.price}`}
                value={product._id}
              />
            ))}
          </Picker>
          <FormItem name="quantity" placeholder="Quantity" type="numeric" />
          <Button block primary onPress={handleSubmit(onSubmit)}>
            <Text style={styles.button}>Edit</Text>
          </Button>
          <Button
            disabled={!valid}
            rounded
            success
            style={styles.closeButton}
            onPress={() => onChangeVisible(false)}
          >
            <Icon name="close" />
          </Button>
        </Form>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: RootState) => ({
  initialValues: state.request.invoiceItem.fetchById.data,
  products: state.product.entities,
  form: 'editInvoiceItem'
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  editInvoiceItem: (index: number, invoiceItem: IInvoiceItem) =>
    dispatch(InvoiceItemAction.editInvoiceItemLocal(index, invoiceItem)),
  resetForm: () => dispatch(reset('editInvoiceItem'))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'editInvoiceItem', validate, enableReinitialize: true })
)(ItemsForm);
