import { StyleSheet, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex:1,
    borderWidth: 1
  },
  roomHeaderTitle: {
    width: '100%',
    height: screen.height * 0.07,
    backgroundColor: '#BFC9CA',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  normalText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFValue(15, 790)
  },
  hoursSectionContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  overnightContainer: {
    width: '100%',
    backgroundColor: '#F1948A',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1
  },
  iconArrow: {
    fontSize: RFValue(15, 790),
    color: 'black'
  },
  normalTxt: {
    fontSize: RFValue(18, 790),
    fontWeight: 'bold'
  },
  smallTxt: {
    fontSize: RFValue(13, 790),
    fontWeight: 'bold'
  },
})

export default styles;