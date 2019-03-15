import ICustomer from '../../../shared/models/Customer';
import * as CUSTOMER_TYPES from '../actions/types';

import { State, initialState, Action } from '../states';
import { deleteEntity, mapEntity } from '../../../shared/utils';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CUSTOMER_TYPES.SET_CUSTOMER_DATA:
      const entities = mapEntity<ICustomer>(state.entities, action.payload);
      return { ...state, entities };
    case CUSTOMER_TYPES.DELETE_CUSTOMER_DATA: {
      const entities = deleteEntity<ICustomer>(action.payload._id, state.entities);
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
