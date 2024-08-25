import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../Theme/ThemeContext';
import {RNText} from '../../../Common';
import {COMMON_SIZE, screenHeight} from '../../../constants/CommonSize';
import {STRINGS} from '../../../constants';
import CartIconAndCount from './CartIconAndCount';
import SearchBar from './SearchBar';
import DeliverToAndHours from './DeliverToAndHours';

const HomeHeader = ({onSearch}) => {
  const {COLORS} = useTheme();
  const [userName, setUserName] = useState('Tamish');

  return (
    <View
      style={[
        styles.homeContainer,
        {
          backgroundColor: COLORS.PRIMARY,
        },
      ]}>
      <SafeAreaView />

      {/* User And Cart */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RNText textColor={COLORS.PRIMARY_FONT} large bold>
          {`${STRINGS.Hey}, ${userName}`}
        </RNText>
        {/* cart icon and Items */}
        <CartIconAndCount />
      </View>

      {/* Search Header */}

      <SearchBar onSearch={onSearch} />
      {/* DeliverToAndHoursWithin */}
      <DeliverToAndHours />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  homeContainer: {
    height: screenHeight / 3,
    paddingHorizontal: COMMON_SIZE.COMMON_MARGIN,
    justifyContent: 'space-evenly',
  },
});
