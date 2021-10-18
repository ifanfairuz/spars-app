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
    },
    [`10.${name}`]: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
    },
  }
}

export const theme = extendTheme({
  colors: {
    spars: {
      whitelight: 'rgba(255, 255, 255, 0.4)',
      red: '#EB5757',
      yellow: '#F2C94C',
      blue: '#00ADFA',
      darkblue: '#57CBFF',
      bluelight: 'rgba(0, 173, 250, 0.1)',
      orange: '#F2994A',
      green: '#5ED1A9',
      green2: '#27AE60',
      grey: '#9E9E9E',
      lightgrey: '#FAFAFA',
      darkgrey: '#E0E0E0',
      lightergrey: '#F1F1F1'
    }
  },
  shadows: {
    ...generateShadow('black', '#000'),
    ...generateShadow('red', '#EB5757'),
    ...generateShadow('yellow', '#F2C94C'),
    ...generateShadow('blue', '#00ADFA'),
    ...generateShadow('darkblue', '#57CBFF'),
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
        borderRadius: '8',
        bg: props.variant == 'unstyled' ? 'transparent' : 'spars.lightgrey',
        p: '3',
        color: 'black',
        fontSize: '14',
        fontWeight: '700',
      }),
    },
    Select: {
      baseStyle: {
        customDropdownIconProps: {
          size: '7',
          mr: '3',
          p: '0',
          color: 'grey'
        },
        color: 'black',
        fontSize: '14',
        borderWidth: '1',
        borderColor: 'spars.darkgrey',
        borderRadius: '8',
        fontWeight: '700'  
      },
      defaultProps: {
        bg: 'spars.lightgrey',
        p: '3',
      },
    },
    TextArea: {
      baseStyle: {
        p: '3',
        borderRadius: '8',
        bg: 'spars.lightgrey',
        fontSize: '14',
        fontWeight: '700',
        color: 'black'
      }
    },
    Image: {
      defaultProps: {
        fallbackSource: require('@assets/images/placeholder.png'),
        loadingIndicatorSource: require('@assets/images/placeholder.png'),
        // defaultSource: require('@assets/images/placeholder.png')
      }
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
      start: [0.10, 0.5],
      end: [0.90, 0.5],
    }
  },
  orange: {
    linearGradient: {
      colors: ['#FFB97B', '#F2994A'],
      start: [0.10, 0.5],
      end: [0.90, 0.5],
    }
  },
  black: {
    linearGradient: {
      colors: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)'],
      start: [0.5, 0],
      end: [0.5, 1],
    }
  }
}