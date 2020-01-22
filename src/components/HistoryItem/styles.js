import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  roomNumber: {
    width: screen.height * 0.06,
    height: screen.height * 0.06,
    borderRadius: screen.height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  roomNumberTxt: {
    color: 'white',
    fontSize: RFValue(15, 790),
    fontWeight: 'bold'
  },
  timeNumberTxt: {
    color: 'white',
    fontSize: RFValue(13, 790),
    fontWeight: 'bold'
  },
  timeWrapper: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagWrapper: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: 'white',

  }
})

export default styles;