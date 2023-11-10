import {StyleSheet} from 'react-native';

enum Colors {
  Brown = '#AC8D46',
  DarkBlue = '#000027',
  DarkGray = '#35333B',
  Silver = '#BABABA',
  Gray = '#d9d9d9',
  GrayV2 = '#B4B4B4',
  LightGray = '#A5A5A5',
}

const fontSizes = StyleSheet.create({
  pri: {fontSize: 12},
  lg: {fontSize: 14},
});

const UI = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  flexFull: {
    flex: 1,
  },
  wFull: {
    width: '100%',
  },
  relative: {
    position: 'relative',
  },
  flexRow: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  roundedFull: {
    borderRadius: 200,
  },
  textBrown: {
    color: Colors.Brown,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingX: {
    paddingHorizontal: 16,
  },
  paddingY: {
    paddingTop: 24,
    paddingBottom: 28,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: 70,
  },
  label: {
    ...fontSizes.pri,
    color: Colors.DarkGray,
    paddingLeft: 4,
    marginBottom: 2,
  },
});

const boxShadow = StyleSheet.create({
  pri: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sec: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

const textShadow = StyleSheet.create({
  pri: {
    textShadowOffset: {width: 0, height: 2.4},
    textShadowRadius: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
  },
});

export {Colors, boxShadow, UI, fontSizes, textShadow};
