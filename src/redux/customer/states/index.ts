import {ActionType} from "typesafe-actions";
import { CustomerEntity } from '../../../shared/typing/state';
import * as CustomerActions from '../actions';

export type Action = ActionType<typeof CustomerActions>;

export type State = {
  entities: CustomerEntity;
};

export const initialState: State = {
  entities: {
    byId: {},
    allIds: []
  }
};
