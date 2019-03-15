import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import {
  Container,
  Content,
  Form,
  Button,
  Picker as BasePicker,
  Badge
} from 'native-base';
import { initialize, InjectedFormProps, reduxForm } from 'redux-form';
import { NavigationScreenProp } from 'react-navigation';

import FormItem from '../../FormItem';
import Picker from '../../Picker';

import { RootAction, RootState } from '../../../../redux/store/types';
import { CustomerEntity } from '../../../typing/state';
import IInvoice from '../../../models/Invoice';
import * as InvoiceActions from '../../../../redux/invoice/actions';
import PATHS from '../../../paths';
import { ID } from '../../../typing/records';
import styles from './style';

const validate = (values: IInvoice) => {
  const errors = {} as any;
  if (!values.customer_id) {
    errors.customer_id = 'customer is required';
  }
  if (!Number(values.discount) && Number(values.discount) !== 0) {
    errors.discount = 'discount is required';
  }
  if (+values.discount > 100) {
    errors.discount = 'discount should be less than 100';
  }
  return errors;
};

type Props = InjectedFormProps & {
  createInvoice: (customer: IInvoice) => void;
  resetForm: () => void;
  editInvoice: (id: ID, customer: IInvoice) => void;
  navigation: NavigationScreenProp<any, any>;
  initialValues: IInvoice | null;
  customers: CustomerEntity;
  invoice: IInvoice;
};

class BaseForm extends React.Component<Props> {
  componentDidMount() {
    const isEdit = this.props.navigation.getParam('isEdit');
    if (!isEdit) this.props.resetForm();
  }

  onSubmit = (values: any) => {
    const { editInvoice, createInvoice, navigation, initialValues, invoice } = this.props;
    const total = invoice ? Number(invoice.total) : 0;
    const discount = Number(values.discount);
    const isEdit = navigation.getParam('isEdit', false);
    isEdit
      ? editInvoice(initialValues!._id, { ...values, discount, total })
      : createInvoice({ ...values, discount, total });
    navigation.navigate(PATHS.Invoices);
  };

  render() {
    const { invoice, customers, valid, handleSubmit } = this.props;
    const total = invoice ? Number(invoice.total) : 0;

    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            <Picker name="customer_id">
              {customers.allIds.map(id => (
                <BasePicker.Item key={id} label={customers.byId[id].name} value={id} />
              ))}
            </Picker>
            <FormItem name="discount" placeholder="Discount" type="decimal-pad" />
          </Form>
          <View style={styles.badgeWrapper}>
            <Badge info style={styles.badge}>
              <Text style={styles.badgeText}>Total: {total.toFixed(2)}</Text>
            </Badge>
          </View>
          <Button block primary onPress={handleSubmit(this.onSubmit)} disabled={!valid}>
            <Text style={styles.button}>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  initialValues: state.request.invoice.fetchById.data,
  customers: state.customer.entities,
  invoice: state.request.invoice.fetchById.data
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  createInvoice: (customer: IInvoice) => dispatch(InvoiceActions.createInvoice(customer)),
  editInvoice: (id: ID, customer: IInvoice) =>
    dispatch(InvoiceActions.editInvoice(id, customer)),
  resetForm: () => dispatch(initialize('invoice', {}))
});

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'invoice', validate })
)(BaseForm);
