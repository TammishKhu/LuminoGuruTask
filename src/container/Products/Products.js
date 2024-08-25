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
import React, {useCallback, useEffect, useState} from 'react';
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
import ProductItem from './Atoms/ProductItem'; // Import ProductItem
import CartIconAndCount from './Atoms/CartIconAndCount';
import SearchBar from './Atoms/SearchBar';
import DeliverToAndHours from './Atoms/DeliverToAndHours';
import {screenWidth} from '../../constants/CommonSize';
import useBounceAnimation from './Animations/useBounceAnimation';
import {CONSTANT} from '../../config';

const HEADER_MAX_HEIGHT = scale(40);
const HEADER_MAX_HEIGHT2 = scale(100);
const HEADER_MIN_HEIGHT = 0;

const Products = () => {
  const {COLORS} = useTheme();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('Tamish');
  const {bounceValue, bounceAnimation} = useBounceAnimation();
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerHeight2 = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT2, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const opacityInterpolate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const {productsData, limit, skip, isLoading, searchTerm, total} = useSelector(
    state => state.productsReducer,
  );

  const HeaderComp = () => (
    <>
      <View style={[styles.homeContainer, {backgroundColor: COLORS.PRIMARY}]}>
        <SafeAreaView />
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <RNText textColor={COLORS.PRIMARY_FONT} large bold>
            {`${STRINGS.Hey}, ${userName}`}
          </RNText>
          <Animated.View style={{transform: [{scale: bounceValue}]}}>
            <CartIconAndCount opacityInterpolate={opacityInterpolate} />
          </Animated.View>
        </Animated.View>
        <View style={styles.searchBarContainer}>
          <SearchBar onSearch={handleOnSearch} />
        </View>
        <Animated.View style={{height: headerHeight2}}>
          <DeliverToAndHours />
          <View
            style={[
              styles.recommendedContainer,
              {backgroundColor: COLORS.BG_COLOR},
            ]}>
            <RNText ManRopeSemiBold large style={styles.headerText}>
              {STRINGS.Recommended}
            </RNText>
          </View>
        </Animated.View>
      </View>
    </>
  );

  useEffect(() => {
    const count = productsData.reduce((acc, product) => {
      return product.quantity >= 1 ? acc + 1 : acc;
    }, 0);

    dispatch(setCountRequest(count));
  }, [productsData]);

  const productsApiCall = ({search, skipItems, shouldLoad}) => {
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
    productsApiCall({search: '', shouldLoad: true, skipItems: 0});
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setCountRequest(0));
    dispatch(setSearchTerm(''));
    productsApiCall({search: '', shouldLoad: true, skipItems: 0});
  }, []);

  const handleOnSearch = search => {
    productsApiCall({search: search, shouldLoad: true, skipItems: 0});
  };

  const loadMoreProducts = () => {
    if (!isLoading && skip < total) {
      productsApiCall({
        search: searchTerm,
        shouldLoad: false,
        skipItems: skip,
      });
    }
  };

  const renderProductItem = ({item, index}) => (
    <View
      style={[
        styles.productItemContainer,
        index % 2 === 0
          ? styles.productItemPaddingLeft
          : styles.productItemPaddingRight,
      ]}>
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
    <View style={[styles.flexContainer, {backgroundColor: COLORS.BG_COLOR}]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />
      {HeaderComp()}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={productsData}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
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
        contentContainerStyle={[
          styles.flatListContentContainer,
          {backgroundColor: COLORS.BG_COLOR},
        ]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(5),
    alignItems: 'center',
  },
  searchBarContainer: {
    paddingVertical: scale(15),
  },
  recommendedContainer: {
    marginVertical: COMMON_SIZE.COMMON_MARGIN, // Adjust margin as needed
    height: scale(140),
    width: screenWidth,
    marginLeft: -COMMON_SIZE.COMMON_MARGIN,
    paddingHorizontal: COMMON_SIZE.COMMON_MARGIN,
  },
  headerText: {
    marginVertical: COMMON_SIZE.COMMON_MARGIN,
  },
  homeContainer: {
    paddingHorizontal: COMMON_SIZE.COMMON_MARGIN,
    justifyContent: 'space-evenly',
  },
  productItemContainer: {
    flex: 1, // Take equal space in each column
    margin: COMMON_SIZE.COMMON_MARGIN / 2, // Half the margin on all sides for even spacing
  },
  productItemPaddingLeft: {
    paddingLeft: COMMON_SIZE.COMMON_MARGIN / 2,
  },
  productItemPaddingRight: {
    paddingRight: COMMON_SIZE.COMMON_MARGIN / 2,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: scale(15),
  },
  flatListContentContainer: {
    flexGrow: 1,
    paddingBottom: scale(50),
  },
});
