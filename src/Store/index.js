import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export const history = createBrowserHistory()

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chatReducer'],
  }
  
const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default function configurStore(preloadedState) {


const store = createStore(
    // createRootReducer(history),
    persistedReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    ),
);
let persistor = persistStore(store)
return {store,persistor};   
// 
}

export const store = configurStore();