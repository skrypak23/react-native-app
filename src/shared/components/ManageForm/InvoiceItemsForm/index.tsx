import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import {
  Container,
  Content,
  Form,
  Button,
  CardItem,
  Picker as BasePicker
} from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { InjectedFormProps, reduxForm, reset } from 'redux-form';

import List from '../../List';
import Picker from '../../../../shared/components/Picker';
import EditItemsForm from '../EditItemsForm';
import FormItem from '../../FormItem';

import { RootAction, RootState } from '../../../../redux/store/types';
import IInvoiceItem from '../../../models/InvoiceItem';
import IProduct from '../../../models/Product';
import { InvoiceItemEntity, ProductEntity } from '../../../typing/state';
import { InvoiceItemRequest } from '../../../../redux/request/actions';
import * as InvoiceItemActions from '../../../../redux/invoice-item/actions';
import { ID } from '../../../typing/records';
import styles from './style';

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
  index?: string;
};

type Props = InjectedFormProps & {
  editInvoiceItem: (id: ID) => void;
  fillItem: (invoiceItem: TIndex) => void;
  deleteInvoiceItemLocal: (index: ID) => void;
  addInvoiceItem: (invoiceItem: IInvoiceItem) => void;
  navigation: NavigationScreenProp<any, any>;
  invoiceItems: InvoiceItemEntity;
  products: ProductEntity;
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

  handleDelete = (id: ID) => this.props.deleteInvoiceItemLocal(id);
  handleEdit = (id: ID) => {
    const quantity = Number(this.props.invoiceItems.byId[id].quantity);
    this.props.fillItem({ ...this.props.invoiceItems.byId[id], quantity, index: id });
    this.handleChangeVisible(true);
  };

  renderItem = (id: ID) => {
    const { invoiceItems, products } = this.props;
    const { product_id } = invoiceItems.byId[id];
    const foundProduct = products.byId[product_id];
    return (
      <CardItem style={styles.cardItem}>
        <Text>Product: {foundProduct ? foundProduct.name : null}, </Text>
        <Text>quantity: {invoiceItems.byId[id].quantity}</Text>
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
              {products.allIds.map(id => (
                <BasePicker.Item
                  key={id}
                  label={`Name: ${products.byId[id].name}, price - ${
                    products.byId[id].price
                  }`}
                  value={id}
                />
              ))}
            </Picker>
            <FormItem name="quantity" placeholder="Quantity" type="numeric" />
          </Form>
          <Button block primary onPress={handleSubmit(this.onSubmit)} disabled={!valid}>
            <Text style={styles.button}>Add</Text>
          </Button>
          <List<string>
            isEdit={true}
            data={invoiceItems.allIds}
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
  deleteInvoiceItemLocal: (index: ID) =>
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
