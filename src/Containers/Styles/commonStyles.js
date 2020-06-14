import {StyleSheet} from 'react-native';
import {totalSize, height, width} from 'react-native-dimension';
import colors from '../../Themes/Colors';
import type from '../../Themes/Fonts';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  space_btw: {
    justifyContent: 'space-between',
  },
  align_center: {
    alignItems: 'center',
  },
  bgContainer: {
    flex: 1,
    height: null,
    width: null,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: width(5),
  },
  h1: {
    fontSize: totalSize(5),
    color: colors.appTextColor1,
    fontFamily: type.appTextMedium,
  },
  h2: {
    fontSize: totalSize(4),
    color: colors.appTextColor1,
    fontFamily: type.appTextMedium,
  },
  h3: {
    fontSize: totalSize(3),
    color: colors.appTextColor1,
    fontFamily: type.appTextMedium,
  },
  h4: {
    fontSize: totalSize(2),
    color: colors.appTextColor1,
    fontFamily: type.appTextMedium,
  },
  h5: {
    fontSize: totalSize(1.5),
    color: colors.appTextColor1,
    fontFamily: type.appTextRegular,
  },
  h6: {
    fontSize: totalSize(1.25),
    color: colors.appTextColor1,
    fontFamily: type.appTextRegular,
  },
  bold: {
    fontWeight: 'bold',
  },
  logoStyle: {
    height: totalSize(30),
    width: totalSize(30),
  },
  smallLogoStyle: {
    height: totalSize(20),
    width: totalSize(20),
  },
  inputContainer: {
    width: width(80),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: colors.appColor1,
  },
  buttonColored: {
    height: height(7),
    width: width(80),
    backgroundColor: colors.appColor1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColoredBlue: {
    height: height(7),
    width: width(80),
    backgroundColor: colors.appColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPinkBordered: {
    height: height(7),
    width: width(80),
    borderWidth: 2,
    borderColor: colors.appColor1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBlueBordered: {
    height: height(7),
    width: width(80),
    borderWidth: 1,
    borderColor: colors.appColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBordered: {
    height: height(7),
    width: width(80),
    //backgroundColor: colors.appColor1,
    borderWidth: 1,
    borderColor: colors.appColor1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: totalSize(2),
    color: '#ffff',
    fontFamily: type.appTextMedium,
  },
  inputStyle: {
    height: height(7),
    width: width(65),
    fontSize: totalSize(2),
    color: '#000000',
    //backgroundColor: colors.appColor1,
    // borderWidth: 1,
    // borderColor: colors.appColor1,
    // borderRadius: 100,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  oAuthButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: height(5),
  },
  oAuthBtnContainer: {
    marginHorizontal: width(5),
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  oAuthBtn: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oAuthBtnImage: {
    width: 25,
    height: 25,
  },
  btnLoader: {
    position: 'absolute',
    right: 15,
  },
  filterContainer: {
    display: 'flex',
    height: height(7),
    width: width(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    borderColor: colors.appColor1,
    borderWidth: 1,
    marginBottom: height(3),
    fontSize: totalSize(2),
    overflow: 'hidden',
  },
  filterText: {
    // lineHeight: 16.5,
    fontSize: totalSize(2),
  },
  filterIcon: {
    backgroundColor: '#ededed',
    borderRadius: 25,
    width: 38,
    height: 38,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
