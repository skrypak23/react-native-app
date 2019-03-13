import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Form,
  Button,
  Card,
  CardItem,
  Picker as BasePicker
} from 'native-base';
import { InjectedFormProps, reduxForm, reset } from 'redux-form';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch, compose } from 'redux';
import { RootAction, RootState } from '../../../../redux/store/types';
import * as InvoiceItemActions from '../../../../redux/invoice-item/actions';
import IInvoiceItem from '../../../models/InvoiceItem';
import { InvoiceItemRequest } from '../../../../redux/request/actions';
import { ID } from '../../../typing/records';
import List from '../../List';
import Picker from '../../../../shared/components/Picker';
import IProduct from '../../../models/Product';
import FormItem from '../../FormItem';
import EditItemsForm from '../EditItemsForm';
import styles from './style';
import { findData } from '../../../utils';

const validate = (values: IInvoiceItem) => {
  const errors = {} as any;
  if (!values.product_id) {
    errors.product_id = 'product is required';
  }
  if (!Number(values.quantity)) {
    errors.quantity = 'quantity is required';
  }
  return errors;
};

type TIndex = IInvoiceItem & {
  index?: number;
};

type Props = InjectedFormProps & {
  editInvoiceItem: (id: ID, invoice: IInvoiceItem) => void;
  fillItem: (invoiceItem: TIndex) => void;
  deleteInvoiceItemLocal: (index: number) => void;
  addInvoiceItem: (invoiceItem: IInvoiceItem) => void;
  navigation: NavigationScreenProp<any, any>;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  products: ReadonlyArray<IProduct>;
  isEdit?: boolean;
  resetForm: () => void;
};
type State = {
  visible: boolean;
};

class BaseForm extends Component<Props, State> {
  state: State = { visible: false };
  onSubmit = (values: any) => {
    const quantity = Number(values.quantity);
    this.props.addInvoiceItem({ ...values, quantity });
    this.props.resetForm();
  };

  handleDelete = (invoiceItem: IInvoiceItem, index?: number) =>
    this.props.deleteInvoiceItemLocal(index as number);
  handleEdit = (invoiceItem: IInvoiceItem, index?: number) => {
    const quantity = Number(invoiceItem.quantity);
    this.props.fillItem({ ...invoiceItem, quantity, index });
    this.handleChangeVisible(true);
  };

  renderItem = (invoiceItem: IInvoiceItem) => {
    const foundProduct = findData<IProduct>(this.props.products, invoiceItem.product_id);
    return (
      <CardItem style={styles.cardItem}>
        <Text>Product: {foundProduct ? foundProduct.name : null}, </Text>
        <Text>quantity: {invoiceItem.quantity}</Text>
      </CardItem>
    );
  };

  handleChangeVisible = (visible: boolean) => this.setState({ visible });

  render() {
    const { products, handleSubmit, invoiceItems, valid } = this.props;
    return (
      <Container>
        <Content padder>
          <Form style={styles.form}>
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
          </Form>
          <Button block primary onPress={handleSubmit(this.onSubmit)} disabled={!valid}>
            <Text style={styles.button}>Add</Text>
          </Button>
          <List<IInvoiceItem>
            isEdit={true}
            data={invoiceItems}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            renderData={this.renderItem}
          />
          <EditItemsForm
            visible={this.state.visible}
            onChangeVisible={this.handleChangeVisible}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  invoiceItems: state.invoiceItem.entities,
  products: state.product.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  addInvoiceItem: (invoiceItem: IInvoiceItem) =>
    dispatch(InvoiceItemActions.addInvoiceItem(invoiceItem)),
  editInvoiceItem: (id: number, invoice: IInvoiceItem) =>
    dispatch(InvoiceItemActions.editInvoiceItemLocal(id, invoice)),
  deleteInvoiceItemLocal: (index: number) =>
    dispatch(InvoiceItemActions.deleteInvoiceItemLocal(index)),
  fillItem: (invoiceItem: TIndex) =>
    dispatch(InvoiceItemRequest.Action.fillItem(invoiceItem)),
  resetForm: () => dispatch(reset('invoiceItem'))
});

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'invoiceItem', validate, enableReinitialize: true })
)(BaseForm);
