import {createReducer} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {
  productsApiFail,
  productsApiPaginationSuccess,
  productsApiRequest,
  productsApiSuccess,
  setCountRequest,
  setSearchTerm,
} from './action';

const initialState = {
  productsData: [],
  productsDataApiFail: false,
  isLoading: false,
  isLoadingSearch: false,
  limit: 10,
  skip: 0,
  availableCount: 0,
  searchTerm: '',
  total: 0,
};
const productsReducer = createReducer(initialState, builder => {
  builder.addCase(productsApiRequest, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  });
  builder.addCase(productsApiSuccess, (state, action) => {
    console.log('🚀 ~ builder.addCase ~ state:___', state);
    return {
      ...state,
      productsData: action.payload.products, // Append new products
      total: action.payload.total || state.total, // Append new products
      skip: action.payload.skip || state.skip, // Append new products
      isLoading: false,
    };
  });

  builder.addCase(productsApiFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      productsData: [],
    };
  });

  builder.addCase(setCountRequest, (state, action) => {
    return {
      ...state,
      availableCount: action.payload,
    };
  });
  builder.addCase(setSearchTerm, (state, action) => {
    return {
      ...state,
      searchTerm: action.payload,
    };
  });
});
export default productsReducer;
