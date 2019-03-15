import {ActionType} from "typesafe-actions";
import { InvoiceEntity } from '../../../shared/typing/state';
import * as InvoiceActions from "../actions";

export type Action = ActionType<typeof InvoiceActions>;

export type State = {
  entities: InvoiceEntity;
};

export const initialState: State = {
  entities: {
    byId: {},
    allIds: []
  }
};
