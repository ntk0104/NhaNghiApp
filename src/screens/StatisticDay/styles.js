import { StyleSheet, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    width: '100%',
    height: screen.height * 0.1,
    backgroundColor: '#61B4DC',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row'
  },
  titleTopBarTxt: {
    color: 'white',
    // fontSize: 20,
    fontSize: RFValue(20, 790),
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  normalTxt: {
    color: 'black',
    // fontSize: 20,
    fontSize: RFValue(18, 790),
    fontWeight: 'bold'
  },
  dateSelectionRow: {
    width: '100%',
    height: screen.height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  startDatePicker: {
    width: 147,
    height: '90%',
    justifyContent: "center",
    alignItems: "center"
  },
  roomsWrapper: {
    flex: 1
  },
  rowRoomsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: screen.height * 0.5,
  },
  btnBack: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnOK: {
    width: 80,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginLeft: 30
  },
  iconBack: {
    color: 'white',
    fontSize: RFValue(25, 790)
  }
})

export default styles;