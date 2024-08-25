import React, {useState, useCallback} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COMMON_SIZE, FONTS, IMAGES, STRINGS} from '../../../constants';
import {COLORS, useTheme} from '../../../Theme/ThemeContext';
import {RNImage} from '../../../Common';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchTerm} from '../module/action';

const SearchBar = ({onSearch}) => {
  const {COLORS} = useTheme();
  const {searchTerm} = useSelector(state => state.productsReducer);
  const dispatch = useDispatch();
  const debouncedSearch = useCallback(
    debounce(val => {
      onSearch(val);
    }, 1000),
    [],
  );

  const handleOnSearch = val => {
    dispatch(setSearchTerm(val));
    debouncedSearch(val);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS.PRIMARY_DARK,
        },
      ]}>
      <View style={{flex: 0.15}}>
        <RNImage source={IMAGES.searchIcon} />
      </View>
      <View style={{flex: 0.85}}>
        <TextInput
          placeholder={STRINGS.SearchProducts}
          placeholderTextColor={COLORS.TEXT_COLOR_D}
          style={[styles.searchInput, {color: COLORS.PRIMARY_FONT}]}
          onChangeText={val => handleOnSearch(val)}
          value={searchTerm}
        />
      </View>
    </View>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: scale(56) / 2,
    height: scale(56),
  },
  searchInput: {
    width: '100%',
    fontSize: COMMON_SIZE.SMALL,
  },
});
