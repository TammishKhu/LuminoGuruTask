import {all} from 'redux-saga/effects';
import productsSaga from '../container/Products/module/saga';

export default function* rootSaga() {
  yield all([productsSaga()]);
}
