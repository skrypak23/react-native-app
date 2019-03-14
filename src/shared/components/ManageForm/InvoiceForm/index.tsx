import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Form,
  Button,
  Picker as BasePicker,
  Badge
} from 'native-base';
import { initialize, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch, compose } from 'redux';
import FormItem from '../../FormItem';
import { RootAction, RootState } from '../../../../redux/store/types';
import * as InvoiceActions from '../../../../redux/invoice/actions';
import IInvoice from '../../../models/Invoice';
import PATHS from '../../../paths';
import styles from './style';
import { ID } from '../../../typing/records';
import Picker from '../../Picker';
import ICustomer from '../../../models/Customer';

const validate = (values: IInvoice) => {
  const errors = {} as any;
  if (!values.customer_id) {
    errors.customer_id = 'customer is required';
  }
  if (!Number(values.discount)) {
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
  customers: ReadonlyArray<ICustomer>;
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
              {customers.map(customer => (
                <BasePicker.Item
                  key={customer._id}
                  label={customer.name}
                  value={customer._id}
                />
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
