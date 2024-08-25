import {combineReducers} from 'redux';
import productsReducer from '../container/Products/module/reducer';

const appReducer = combineReducers({
  productsReducer: productsReducer,
});
export default appReducer;
