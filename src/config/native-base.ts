import { extendTheme } from "native-base";
import LinearGradient from "react-native-linear-gradient";

function generateShadow(name: string, color: string) {
  return {
    [`0.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    [`1.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    [`2.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    [`3.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    [`4.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    [`5.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    [`6.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    [`7.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    [`8.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    },
    [`9.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }
  }
}

export const theme = extendTheme({
  colors: {
    spars: {
      red: '#EB5757',
      yellow: '#F2C94C',
      blue: '#00ADFA',
      bluelight: 'rgba(0, 173, 250, 0.1)',
      orange: '#F2994A',
      green: '#5ED1A9',
      green2: '#27AE60',
      grey: '#9E9E9E',
      lightgrey: '#FAFAFA',
      darkgrey: '#E0E0E0'
    }
  },
  shadows: {
    ...generateShadow('red', '#EB5757'),
    ...generateShadow('yellow', '#F2C94C'),
    ...generateShadow('blue', '#00ADFA'),
    ...generateShadow('orange', '#F2994A'),
    ...generateShadow('green', '#5ED1A9'),
    ...generateShadow('green2', '#27AE60'),
    ...generateShadow('grey', '#9E9E9E'),
    ...generateShadow('lightgrey', '#FAFAFA'),
    ...generateShadow('darkgrey', '#E0E0E0'),
  },
  fontConfig: {
    NunitoSans: {
      100: {
        normal: 'NunitoSans-ExtraLight',
        italic: 'NunitoSans-ExtraLightItalic',
      },
      200: {
        normal: 'NunitoSans-Light',
        italic: 'NunitoSans-LightItalic',
      },
      300: {
        normal: 'NunitoSans-Light',
        italic: 'NunitoSans-LightItalic',
      },
      400: {
        normal: 'NunitoSans-Regular',
        italic: 'NunitoSans-Italic',
      },
      500: {
        normal: 'NunitoSans-Regular',
        italic: 'NunitoSans-Italic',
      },
      600: {
        normal: 'NunitoSans-SemiBold',
        italic: 'NunitoSans-SemiBoldItalic',
      },
      700: {
        normal: 'NunitoSans-Bold',
        italic: 'NunitoSans-BoldItalic',
      },
      800: {
        normal: 'NunitoSans-ExtraBold',
        italic: 'NunitoSans-ExtraBoldItalic',
      },
      900: {
        normal: 'NunitoSans-Black',
        italic: 'NunitoSans-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'NunitoSans',
    body: 'NunitoSans',
    mono: 'NunitoSans'
  },
  components: {
    Button: {
      baseStyle: props => ({
        borderRadius: '8',
        _text: {
          fontWeight: '700'
        }
      })
    },
    Input: {
      baseStyle: props => ({
        borderRadius: '8'
      })
    }
  }
});

export const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  }
}

export const gradient = {
  blue: {
    linearGradient: {
      colors: ['#57CBFF', '#00ADFA'],
      start: [0.25, 0.5],
      end: [0.75, 0.5],
    }
  }
}