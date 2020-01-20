import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1, 
    borderBottomColor: '#7F8C8D'
  },
  rowHeader: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyHeader: {
    flex: 3,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,

  },
  totalHeader: {
    flex: 1.5,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: RFValue(12, 790),
    fontWeight: 'bold'
  },
  textQuantity: {
    fontSize: RFValue(15, 790),
    fontWeight: 'bold'
  },
  durationTxt: {
    fontSize: RFValue(12, 790),
    fontWeight: 'bold'
  },
  totalMoneyAmount: {
    fontSize: RFValue(15, 790),
    color: 'red',
    textDecorationStyle: 'dotted',
    fontWeight: 'bold'
  },
  btnDecrease: {
    color: 'red', 
    fontSize: RFValue(30, 790),
  },
  btnIncrease: {
    color: 'green', 
    fontSize: RFValue(30, 790),
  },
  btnDecreaseBig: {
    color: 'red', 
    fontSize: RFValue(35, 790),
  },
  btnIncreaseBig: {
    color: 'green', 
    fontSize: RFValue(35, 790),
  }
})

export default styles;