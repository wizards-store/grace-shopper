import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import productReducer from './product';
import cartReducer from './cart';
import wishlistReducer from './wishlist';

const reducer = combineReducers({
  user,
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './product';
export * from './cart';
export * from './wishlist';
