import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES, STRINGS} from '../../../constants';
import {RNImage, RNText} from '../../../Common';
import {useTheme} from '../../../Theme/ThemeContext';
import {defaultData} from '../../../constants/Mocks';
import {scale} from 'react-native-size-matters';
import {CONSTANT} from '../../../config';

const DeliverToAndHours = () => {
  const {COLORS} = useTheme();

  const commonColumnItem = ({label, value, type}) => {
    return (
      <View
        style={
          type === CONSTANT.TIME ? styles.timeColumn : styles.addressColumn
        }>
        <RNText
          marginBottom={scale(5)}
          textColor={COLORS.TEXT_COLOR_D}
          extraSmall>
          {label}
        </RNText>
        <View style={styles.valueRow}>
          <RNText textColor={COLORS.PRIMARY_FONT} extraSmall>
            {value}
          </RNText>
          <RNImage source={IMAGES.arrowDown} style={styles.arrowDown} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {commonColumnItem({
        label: STRINGS.DeliveryTo.toUpperCase(),
        value: defaultData.deliverTo,
        type: CONSTANT.ADDRESS,
      })}
      {commonColumnItem({
        label: STRINGS.WithIn.toUpperCase(),
        value: `${defaultData.time} ${STRINGS.Hour}`,
        type: CONSTANT.TIME,
      })}
    </View>
  );
};

export default DeliverToAndHours;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  addressColumn: {
    flex: 0.75,
  },
  timeColumn: {
    flex: 0.25,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowDown: {
    height: scale(10),
    width: scale(10),
    marginHorizontal: scale(5),
  },
});
