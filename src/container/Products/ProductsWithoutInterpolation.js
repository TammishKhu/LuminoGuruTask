import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RNText} from '../../Common';
import {useTheme} from '../../Theme/ThemeContext';
import {useDispatch, useSelector} from 'react-redux';
import {
  productsApiRequest,
  favouriteProductRequest,
  addCartItemRequest,
  removeCartItemRequest,
  setCountRequest,
  setSearchTerm,
} from './module/action';
import {scale} from 'react-native-size-matters';
import {STRINGS, COMMON_SIZE} from '../../constants';
import ProductItem from './Atoms/ProductItem';
import CartIconAndCount from './Atoms/CartIconAndCount';
import SearchBar from './Atoms/SearchBar';
import DeliverToAndHours from './Atoms/DeliverToAndHours';
import {screenHeight} from '../../constants/CommonSize';
import useBounceAnimation from './Animations/useBounceAnimation';
import {CONSTANT} from '../../config';

const Products = () => {
  const {COLORS} = useTheme();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('Tamish');
  const {bounceValue, bounceAnimation} = useBounceAnimation();

  const {productsData, limit, skip, isLoading, searchTerm, total} = useSelector(
    state => state.productsReducer,
  );

  useEffect(() => {
    const count = productsData.reduce((acc, product) => {
      return product.quantity >= 1 ? acc + 1 : acc;
    }, 0);

    dispatch(setCountRequest(count));
  }, [productsData]);

  const productsApiCall = ({search, skipItems}) => {
    let body = {
      limit: limit,
      skip: skipItems,
      search: search,
    };
    let callback = res => {
      if (res !== 'error') {
        setRefreshing(false);
      }
    };
    dispatch(productsApiRequest({body, callback}));
  };

  useEffect(() => {
    productsApiCall({search: '', skipItems: 0});
  }, []);

  const handleFavourite = product => () => {
    let body = {product};
    dispatch(favouriteProductRequest({body}));
  };

  const handleAddItem = product => () => {
    bounceAnimation();
    let body = {product};
    dispatch(addCartItemRequest({body}));
  };

  const handleRemoveItem = product => () => {
    bounceAnimation();
    let body = {product};
    dispatch(removeCartItemRequest({body, screen: CONSTANT.PRODUCTS}));
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setCountRequest(0));
    dispatch(setSearchTerm(''));
    productsApiCall({search: '', skipItems: 0});
  };

  const handleOnSearch = search => {
    productsApiCall({search: search, skipItems: 0});
  };

  const loadMoreProducts = () => {
    if (!isLoading && skip < total) {
      productsApiCall({search: searchTerm, skipItems: skip});
    }
  };

  const renderProductItem = ({item, index}) => (
    <View style={[styles.productItemContainer, styles.getItemPadding(index)]}>
      <ProductItem
        product={item}
        COLORS={COLORS}
        handleFavourite={handleFavourite}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
      />
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLORS.BG_COLOR}}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={productsData}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <View
              style={[styles.homeContainer, {backgroundColor: COLORS.PRIMARY}]}>
              <SafeAreaView />
              <View style={styles.headerContainer}>
                <RNText textColor={COLORS.PRIMARY_FONT} large bold>
                  {`${STRINGS.Hey}, ${userName}`}
                </RNText>
                <Animated.View style={{transform: [{scale: bounceValue}]}}>
                  <CartIconAndCount />
                </Animated.View>
              </View>
              <SearchBar onSearch={handleOnSearch} />
              <DeliverToAndHours />
            </View>
            <View style={styles.recommendedContainer}>
              <RNText ManRopeSemiBold large style={styles.headerText}>
                {STRINGS.Recommended}
              </RNText>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            <RNText medium ManRopeBold>
              {STRINGS.NoProducts}
            </RNText>
          </View>
        }
        ListFooterComponent={
          skip < total &&
          (isLoading ? <ActivityIndicator color={COLORS.PRIMARY_DARK} /> : null)
        }
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: COLORS => ({
    flex: 1,
    backgroundColor: COLORS.BG_COLOR,
  }),
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyComponent: {
    alignItems: 'center',
    paddingVertical: scale(15),
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: scale(50),
  },
  recommendedContainer: {
    marginVertical: COMMON_SIZE.COMMON_MARGIN,
    marginHorizontal: COMMON_SIZE.COMMON_MARGIN,
  },
  headerText: {
    marginBottom: COMMON_SIZE.COMMON_MARGIN,
    marginTop: COMMON_SIZE.COMMON_MARGIN,
  },
  homeContainer: {
    height: screenHeight / 3,
    paddingHorizontal: COMMON_SIZE.COMMON_MARGIN,
    justifyContent: 'space-evenly',
  },
  productItemContainer: {
    flex: 1,
    margin: COMMON_SIZE.COMMON_MARGIN / 2,
  },
  getItemPadding: index => ({
    paddingLeft: index % 2 === 0 ? COMMON_SIZE.COMMON_MARGIN / 2 : 0,
    paddingRight: index % 2 !== 0 ? COMMON_SIZE.COMMON_MARGIN / 2 : 0,
  }),
});
