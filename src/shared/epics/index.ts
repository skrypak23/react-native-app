import { StateObservable } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { differenceWith } from 'ramda';

import { InvoiceItemRequest } from '../../redux/request/actions';
import IInvoiceItem from '../models/InvoiceItem';
import { ID } from '../typing/records';
import { RootState } from '../../redux/store/types';

const diffItems = (state$: StateObservable<RootState>) => {
  const items = Object.values(state$.value.invoiceItem.entities.byId);
  const requestedItems = state$.value.request.invoiceItem.fetch.data;

  const cmp = (x: IInvoiceItem, y: IInvoiceItem) => x._id === y._id;
  const existedItems = items.filter(iI => iI.hasOwnProperty('_id'));
  return differenceWith(cmp, requestedItems, existedItems);
};

export const createItems = (state$: StateObservable<RootState>, invoiceId: ID) => {
  return from(Object.values(state$.value.invoiceItem.entities.byId)).pipe(
    filter(invoiceItem => !invoiceItem.hasOwnProperty('_id')),
    map(item =>
      InvoiceItemRequest.Action.createInvoiceItemRequest(invoiceId, {
        ...item
      } as IInvoiceItem)
    )
  );
};
export const editItems = (state$: StateObservable<RootState>, invoiceId: ID) => {
  const edited = state$.value.invoiceItem.edited;
  return from(Object.values<IInvoiceItem>(edited)).pipe(
    map(item =>
      InvoiceItemRequest.Action.editInvoiceItemRequest(item!._id, invoiceId, item)
    )
  );
};
export const deleteItems = (state$: StateObservable<RootState>, invoiceId: ID) => {
  const diff = diffItems(state$);
  return from(diff).pipe(
    map(item => InvoiceItemRequest.Action.deleteInvoiceItemRequest(item._id, invoiceId))
  );
};
