import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchInvoiceItemByIdTypes {
  FETCH_INVOICE_ITEM_BY_ID_REQUEST = '@invoice-app/invoice-item/FETCH_INVOICE_ITEM_BY_ID_REQUEST',
  FETCH_INVOICE_ITEM_BY_ID_SUCCESS = '@invoice-app/invoice-item/FETCH_INVOICE_ITEM_BY_ID_SUCCESS',
  FETCH_INVOICE_ITEM_BY_ID_FAILURE = '@invoice-app/invoice-item/FETCH_INVOICE_ITEM_BY_ID_FAILURE',
  FILL_INVOICE_ITEM = '@invoice-app/invoice-item/FILL_INVOICE_ITEM',
  RESET_INVOICE = '@invoice-app/invoice-item/RESET_INVOICE'
}

type TIndex = IInvoiceItem & {
  index?: string;
};

export const FetchInvoiceItemByIdActions = {
  fetchInvoiceItemByIdRequest: (id: ID, invoiceId: ID) =>
    action(FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_REQUEST, {
      url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`
    }),
  fetchInvoiceItemByIdSuccess: createStandardAction(
    FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_SUCCESS
  )<IInvoiceItem>(),
  fillItem: createStandardAction(FetchInvoiceItemByIdTypes.FILL_INVOICE_ITEM)<TIndex>(),
  resetInvoiceItem: createStandardAction(FetchInvoiceItemByIdTypes.RESET_INVOICE)<
    undefined
  >(),
  fetchInvoiceItemByIdFailure: createStandardAction(
    FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_FAILURE
  )<Error>()
};
