import {navigationRef} from '../navigation/rootNavigation';

export const _onPressNavigate = (key, data = {}) => {
  navigationRef.navigate(key, data);
};
export const _onPressGoBackNavigate = () => {
  navigationRef.goBack();
};
