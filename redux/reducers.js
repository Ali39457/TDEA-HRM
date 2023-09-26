import { SET_USERNAME,SET_PASSWORD,SET_INCREMENT,SET_DECREMENT} from "./actions";
 
const initialState={
    user: 'admin',
    pwd:'admin',
    count:0,
}

function taskReducers(state=initialState, action){
    switch(action.type){
       case SET_USERNAME:
           return{...state, user: action.payload}
      case SET_PASSWORD:
          return{...state, pwd: action.payload}
      case SET_INCREMENT:
          return {...state,count:state.count + 1}
      case SET_DECREMENT:
          return {...state,count:state.count - 1}

        default:
        return state;
    }
}

export default taskReducers;