import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {ENV} from '../config';
import {STRINGS} from '../constants';
import {Alert} from 'react-native';

// Function to make GET requests
export function get(path) {
  return apiRequest('get', path);
}

// Function to create request headers
async function apiRequestHeader() {
  const headers = {
    'Content-Type': 'application/json',
  };
  return {
    ...headers,
  };
}

// Function to perform API requests
async function apiRequest(method, path) {
  try {
    // Check network connectivity
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert('Network Unstable');
      return {message: STRINGS.noNetworkError}; // Handle no network error
    }

    const endpoint = ENV.BASE_URL + path;
    const headers = await apiRequestHeader();
    const options = {
      url: endpoint,
      method,
      headers,
      timeout: 180000,
    };
    console.log('🚀 ~ apiRequest ~ options:', options);
    const response = await axios(options);
    console.log('response.data', response.data);
    return response.data;
  } catch (e) {
    console.log('🚀 ~ apiRequest ~ e:', e);
    console.log('API catch error', e);
    return {message: STRINGS.apiError}; // Handle general API errors
  }
}
