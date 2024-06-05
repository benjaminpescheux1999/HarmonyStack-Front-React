import { AnyAction } from 'redux';


const initialState = {
    email: '',
    id: 0,
    username: '',
    lastname: ''
};
interface IAction extends AnyAction {
    payload?: IPayload;
}


// interface IAction {
//     type: string;
//     payload: IPayload;
// }

interface IPayload {
    email?: string;
    id?: number;
    username?: string;
    lastname?: string;
}

function userReducer(state = initialState, action:IAction) {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
}

export default userReducer;