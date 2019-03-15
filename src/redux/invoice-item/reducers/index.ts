import IInvoiceItem from '../../../shared/models/InvoiceItem';
import * as INVOICE_ITEMS_TYPES from '../actions/types';

import { State, initialState, Action } from '../states';
import { deleteEntity, mapEntity } from '../../../shared/utils';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_ITEMS_TYPES.SET_INVOICE_ITEM_DATA:
      const entities = mapEntity<IInvoiceItem>(state.entities, action.payload);
      return {
        ...state,
        entities
      };

    case INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS:
      return {
        ...state,
        entities: initialState.entities
      };

    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM_LOCAL: {
      const entities = deleteEntity<IInvoiceItem>(action.payload, state.entities);
      return { ...state, entities };
    }

    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEM_LOCAL: {
      const { index, invoiceItem } = action.payload;
      const entities = { ...state.entities };
      const edited = { ...state.edited, [index]: invoiceItem };
      entities.byId[action.payload.index] = action.payload.invoiceItem;
      return {
        ...state,
        entities,
        edited
      };
    }
    case INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM: {
      const { entities: stateEntities } = state;
      const entitiesLength = stateEntities.allIds.length;
      const key = `local_${entitiesLength + 1}`;

      const byId = { ...stateEntities.byId, [key]: action.payload };
      const allIds = [...stateEntities.allIds, key];

      const entities = { ...state.entities, byId, allIds };
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
