import {DefaultTheme} from 'styled-components';
import 'styled-components';

declare module 'styled-components' {
  export type DefaultThemeColorKey = 'white' | 'textMain' | 'textBrown';

  export interface DefaultTheme {
    colors: {
      [key in DefaultThemeColorKey]: string;
    };
  }
}

const colors = {
  white: '#ffffff',
  textMain: '#F9F1E1',
  textBrown: '#572E16',
};
const theme: DefaultTheme = {
  colors,
};
export default theme;
