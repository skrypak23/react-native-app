import {ActionType} from "typesafe-actions";
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import { InvoiceItemEntity } from '../../../shared/typing/state';
import * as InvoiceItemActions from "../actions";

export type Action = ActionType<typeof InvoiceItemActions>;
export type TEdit = { [index: number]: IInvoiceItem };

export type State = {
  entities: InvoiceItemEntity;
  edited: TEdit;
  item: IInvoiceItem | null;
};

export const initialState: State = {
  entities: {
    byId: {},
    allIds: []
  },
  edited: {},
  item: null
};
