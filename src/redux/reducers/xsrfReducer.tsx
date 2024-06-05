import { AnyAction } from 'redux';


const initialState = {
  xsrfToken: '',
};

interface IAction extends AnyAction {
    payload?: IPayload;
}

interface IPayload {
    email?: string;
    id?: number;
    username?: string;
    lastname?: string;
}

function xsrfReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'UPDATE_XSRF':
      return {
        ...state,
        xsrfToken: action.payload
      };
    case 'CLEAR_XSRF':
      return initialState;
    default:
      return state;
  }
}

export default xsrfReducer;