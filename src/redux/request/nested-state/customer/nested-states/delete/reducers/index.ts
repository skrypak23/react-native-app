import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { DeleteCustomerActions, DeleteCustomerTypes } from '../actions';

type Action = ActionType<typeof DeleteCustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case DeleteCustomerTypes.DELETE_CUSTOMER_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case DeleteCustomerTypes.DELETE_CUSTOMER_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case DeleteCustomerTypes.DELETE_CUSTOMER_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
