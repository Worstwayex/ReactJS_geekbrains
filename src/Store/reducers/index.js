import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import { connectRouter } from 'connected-react-router'
import profileReducer from './profileReducer'
// import messageReducer from './messageReducer'

const createRootReducer = (history) => combineReducers({
        router:connectRouter(history),
        chatReducer,
        // messageReducer,
        profileReducer,
});
export default createRootReducer