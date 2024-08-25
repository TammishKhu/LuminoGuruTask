import {createAction} from '@reduxjs/toolkit';

export const productsApiRequest = createAction('productsApiRequest');
export const productsApiSuccess = createAction('productsApiSuccess');

export const productsApiFail = createAction('productsApiFail');
// Favourite product

export const favouriteProductRequest = createAction('favouriteProductRequest');
export const favouriteProductSuccess = createAction('favouriteProductSuccess');
// add
export const addCartItemRequest = createAction('addCartItemRequest');
export const addCartItemSuccess = createAction('addCartItemSuccess');
// remove
export const removeCartItemRequest = createAction('removeCartItemRequest');
export const removeCartItemSuccess = createAction('removeCartItemSuccess');

//
export const setCountRequest = createAction('setCountRequest');
//

export const setSearchTerm = createAction('setSearchTerm');
