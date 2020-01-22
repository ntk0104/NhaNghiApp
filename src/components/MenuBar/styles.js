import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    // height: 60,
    height: screen.height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#61B4DC'
  },
  btnSetting: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: 'gray',
    borderLeftWidth: 2
  },
  leftMenu: {
    width: screen.width - 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTxt: {
    color: 'white',
    // fontSize: 20,
    fontSize: RFValue(20, 790),
    fontWeight: 'bold'
  },
  iconSetting: {
    fontSize: RFValue(30, 790),
  }
})

export default styles;