import IProduct from '../../../shared/models/Product';
import * as PRODUCT_TYPES from '../actions/types';

import { State, initialState, Action } from '../states';
import { mapEntity, deleteEntity } from '../../../shared/utils';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case PRODUCT_TYPES.SET_PRODUCT_DATA:
      const entities = mapEntity<IProduct>(state.entities, action.payload);
      return {
        ...state,
        entities
      };
    case PRODUCT_TYPES.DELETE_PRODUCT_DATA: {
      const entities = deleteEntity<IProduct>(action.payload._id, state.entities);
      return {
        ...state,
        entities
      };
    }
    default:
      return state;
  }
};

export default reducer;
