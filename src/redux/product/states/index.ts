import {ActionType} from "typesafe-actions";
import { ProductEntity } from '../../../shared/typing/state';
import * as ProductActions from "../actions";

export type Action = ActionType<typeof ProductActions>;

export type State = {
  entities: ProductEntity;
};

export const initialState: State = {
  entities: {
    byId: {},
    allIds: []
  }
};
