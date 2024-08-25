import {DARK_THEME, LIGHT_THEME} from '../constants/Colors';
import {ThemeProvider} from './ThemeContext';

export declare const COLORS: typeof LIGHT_THEME & typeof DARK_THEME;
export declare const toggleTheme: function;

export declare function useTheme(): {
  COLORS: typeof COLORS;
  toggleTheme: typeof toggleTheme;
};
// declare global {
//    var COLORS: typeof LIGHT_THEME & typeof DARK_THEME;;
// }
