import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {RNText} from '../../../../Common';
import {COLORS, useTheme} from '../../../../Theme/ThemeContext';

const DetailRow = ({label, value}) => {
  const {COLORS} = useTheme();
  return (
    <View style={styles.detailRow}>
      <RNText style={{color: COLORS.TEXT_COLOR_C}}>{label}</RNText>
      <RNText style={{color: COLORS.TEXT_COLOR}}>{value}</RNText>
    </View>
  );
};

export default DetailRow;

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(5),
  },
  label: {
    fontSize: scale(14),
  },
  value: {
    fontSize: scale(14),
  },
});
