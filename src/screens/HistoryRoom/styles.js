import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navigationBar: {
    width: '100%',
    height: screen.height * 0.1,
    backgroundColor: '#1A72BC',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnBack: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#F5B041',
    padding: 10,
  },
  leftBodyContainer: {
    flex: 6,
    // backgroundColor: '#D35400',
  },
  topLeftBodyContainer: {
    flex: 7,
    // backgroundColor: '#A569BD',
  },
  rowInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconBack: {
    color: 'white',
    fontSize: RFValue(25, 790)
  },
  headerTitleTxt: {
    fontSize: RFValue(15, 790),
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    color: 'black',
    fontSize: RFValue(18, 790),
    fontWeight: 'bold'
  },
  InfoRowWrapper: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  InfoCMNDWrapper: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  imgCMND: {
    width: screen.width * 0.15,
    height: '80%',
    resizeMode: 'contain',
    marginRight: 10
  },
  bodyRightContainer: {
    flex: 4
  },
  historyNote: {
    color: 'black',
    height: '100%',
    width: '100%',
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'white',
    fontSize: RFValue(15, 790),
    fontWeight: '600',
    padding: 5
  },
})

export default styles;