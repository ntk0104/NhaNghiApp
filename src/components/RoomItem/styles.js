import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  roomNumberWrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
    width: '100%'
  },
  roomNumberTxt: {
    color: 'white',
    fontSize: RFValue(18, 790),
    fontWeight: 'bold'
  },
  roomContainer: {
    width: '11%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  part: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5
  },
  tagWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white'
  },
  tagTxt: {
    color: 'white',
    fontSize: RFValue(18, 790),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  advancedPaidTxt: {
    color: 'white',
    fontSize: RFValue(12, 790),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  durationTxt: {
    color: 'white',
    fontSize: RFValue(12, 790),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  iconStyle: {
    color: 'white',
    fontSize: RFValue(13, 790),
  },
  iconHeartStyle: {
    color: 'red',
    fontSize: RFValue(13, 790),
  },
  overnightTxt: {
    color: 'white',
    fontSize: RFValue(13, 790),
    fontWeight: 'bold'
  },
})

export default styles;