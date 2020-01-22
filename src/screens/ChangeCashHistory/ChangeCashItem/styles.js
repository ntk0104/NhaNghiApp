import { StyleSheet, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    width: '95%',
    padding: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addTimeWrapper: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  typeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrapper: {
    flex: 6,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  totalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  normalTxt: {
    fontSize: RFValue(18, 790),
    color: 'black',
  },
  typeView: {
    padding: 10, 
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  typeTxt: {
    color: 'white',
    fontSize: RFValue(12,790),
    fontWeight: 'bold'
  },
  titleTxt: {
    color: 'black',
    fontSize: RFValue(12,790),
    fontWeight: 'bold'
  },
  btnBack: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'white',
    borderRadius: 2
  },
  iconBack: {
    color: 'white',
    fontSize: RFValue(25, 790)
  }
})

export default styles;
