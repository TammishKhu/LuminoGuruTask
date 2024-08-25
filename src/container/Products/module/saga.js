import {put, select, takeEvery} from 'redux-saga/effects';
import {
  addCartItemRequest,
  favouriteProductRequest,
  productsApiFail,
  productsApiRequest,
  productsApiSuccess,
  removeCartItemRequest,
} from './action';
import {CONSTANT, ENDPOINT} from '../../../config';
import {get} from '../../../utils/api';

function* productsApiCall({payload}) {
  console.log('🚀 ~ function*productsApiCall ~ payload:', payload);
  let limit = payload.body.limit;
  let skip = payload.body.skip;
  const productsData = yield select(
    state => state.productsReducer.productsData,
  );
  console.log('🚀 ~ function*productsApiCall ~ productsData:', productsData);

  console.log('🚀 ~ function*productsApiCall ~ skip:', skip);
  let search = payload.body.search;
  try {
    const response = yield get(
      `${ENDPOINT.productsList}=${search}&limit=${limit}&skip=${skip}`,
    );
    console.log(response, 'response______');

    if (response && response?.products.length > 0) {
      if (skip === 0) {
        yield put(
          productsApiSuccess({
            products: response.products,
            total: response.total,
            skip: skip + limit,
          }),
        );
      } else if (skip > 0) {
        yield put(
          productsApiSuccess({
            products: [...productsData, ...response.products],
            total: response.total,
            skip: skip + limit,
          }),
        );
      }
      payload?.callback && payload?.callback(response);
    } else {
      payload?.callback && payload?.callback('error');
      yield put(productsApiFail());
    }
  } catch (error) {
    console.log('🚀 ~ function*productsApiCall ~ error:', error);
    payload?.callback && payload?.callback('error');
    yield put(productsApiFail());
  }
}

function* favouriteProduct({payload}) {
  let product = payload.body.product;
  const productsData = yield select(
    state => state.productsReducer.productsData,
  );
  const updatedList = productsData.map(item =>
    item.id === product.id ? {...item, isFavMarked: !item.isFavMarked} : item,
  );
  yield put(productsApiSuccess({products: updatedList}));
}

function* addCartItem({payload}) {
  let product = payload.body.product;
  console.log('🚀 ~ function*addCartItem ~ product:', product);
  const productsData = yield select(
    state => state.productsReducer.productsData,
  );
  const updatedList = productsData.map(item =>
    item.id === product.id
      ? {...item, quantity: (item.quantity || 0) + 1}
      : item,
  );
  yield put(productsApiSuccess({products: updatedList}));
}

function* removeCartItem({payload}) {
  let product = payload.body.product;
  let screen = payload.screen;
  console.log('🚀 ~ function*removeCartItem ~ screen:', screen);
  console.log('🚀 ~ function*removeCartItem ~ product:', product);
  const productsData = yield select(
    state => state.productsReducer.productsData,
  );
  const updatedList = productsData.map(item => {
    if (item.id === product.id) {
      if (screen === CONSTANT.CART) {
        return {
          ...item,
          quantity: item.quantity > 0 ? item.quantity - 1 : 0, // Subtract quantity only if it's greater than 0
        };
      } else if (screen === CONSTANT.PRODUCTS) {
        return {
          ...item,
          quantity: 0, // Set quantity to 0 for PRODUCTS
        };
      }
    }
    return item; // Return the item unchanged if it doesn't match
  });
  yield put(productsApiSuccess({products: updatedList}));
}

function* productsSaga() {
  yield takeEvery(productsApiRequest, productsApiCall);
  yield takeEvery(favouriteProductRequest, favouriteProduct);
  yield takeEvery(addCartItemRequest, addCartItem);
  yield takeEvery(removeCartItemRequest, removeCartItem);
}
export default productsSaga;
