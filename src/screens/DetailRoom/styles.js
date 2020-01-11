import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F9'
  },
  navigationBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#1A72BC',
    flexDirection: 'row'
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
  headerTitleTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#F5B041',
    padding: 10,
    height: screen.height - 140
  },
  btnAction: {
    width: 150,
    height: '80%',
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  bottomBar: {
    width: '100%',
    height: 70,
    backgroundColor: '#EAFAF1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  leftBodyContainer: {
    flex: 6,
    // backgroundColor: '#D35400',
  },
  rightBodyContainer: {
    flex: 4,
    backgroundColor: '#D5DBDB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topLeftBodyContainer: {
    flex: 7,
    // backgroundColor: '#A569BD',
  },
  bottomLeftBodyContainer: {
    flex: 3,
    backgroundColor: '#D5DBDB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowInfoContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoRowWrapper: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  titleTxt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  optionBtnWrapper: {
    width: '70%',
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row'
  },
  optionSectionType: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  InfoCMNDWrapper: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  menuWrapper: {
    flex: 1,
    width: '90%',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10
  },
  totalWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: '#E74C3C'
  },
  totalHeaderWrapper: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalTxtWrapper: {
    flex: 3,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  PayBtnWrapper: {
    flex: 1.5,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalTxt: {
    fontSize: 25,
    color: '#CB4335',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  payBtn: {
    backgroundColor: '#28B463',
    borderRadius: 5,
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles;