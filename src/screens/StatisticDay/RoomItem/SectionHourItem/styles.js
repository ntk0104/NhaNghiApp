import { StyleSheet, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 2,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  normalTxt: {
    fontSize: RFValue(15, 790)
  },
  iconArrow: {
    fontSize: RFValue(15, 790),
    color: 'black'
  }
})

export default styles;