import IInvoice from '../../../shared/models/Invoice';
import * as INVOICE_TYPES from '../actions/types';

import { State, initialState, Action } from '../states';
import { deleteEntity, mapEntity } from '../../../shared/utils';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_TYPES.SET_INVOICE_DATA: {
      const entities = mapEntity<IInvoice>(state.entities, action.payload);
      return {
        ...state,
        entities
      };
    }
    case INVOICE_TYPES.DELETE_INVOICE_DATA: {
      const entities = deleteEntity<IInvoice>(action.payload._id, state.entities);
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
