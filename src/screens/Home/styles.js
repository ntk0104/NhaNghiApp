import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  leftSideContent: {
    flex: 8,
    flexDirection: 'column'
  },
  rightSideContent: {
    flex: 3,
    backgroundColor: '#95A5A6',
    alignItems: 'center',
    paddingTop: 10
  },
  lableTxt: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20
  },
  labelWrapper: {
    flex: 1
  },
  roomMapContainer: {
    flex: 7,
    padding: 10
  },
  totalContainer: {
    flex: 0.8,
    backgroundColor: '#2A6C97',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  roomsLaneContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  btnWithDraw: {
    paddingHorizontal: 15,
    height: '80%',
    backgroundColor: '#FF5B5B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },
  withdrawTxt: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 10,
    fontSize: RFValue(15, 790),
  },
  historyTitleTxt: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 10,
    fontSize: RFValue(20, 790),
  },
  modalContent: {
    width: screen.width * 0.85,
    height: screen.height * 0.85,
    backgroundColor: 'white',
    borderRadius: 5
  },
  modalTopBar: {
    width: '100%',
    height: screen.height * 0.1,
    // flex: 1,
    backgroundColor: '#28B463',
    flexDirection: 'row'
  },
  modalHeaderTxtWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnCloseModal: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C'
  },
  headerTxt: {
    color: 'white',
    fontSize: RFValue(20, 790),
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  modalFooter: {
    width: '100%',
    height: screen.height * 0.1,
    // flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#AEB6BF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modalBody: {
    // backgroundColor: 'yellow',
    // flex: 1,
    width: '100%',
    height: screen.height * 0.6,
    flex: 6,
    flexDirection: 'row'
  },
  btnOK: {
    height: '80%',
    paddingHorizontal: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28B463',
    borderRadius: 5
  },
  leftBodyContainer: {
    flex: 3,
    // backgroundColor: '#F5B041',
    padding: 5
  },
  rightBodyContainer: {
    flex: 2,
    // backgroundColor: '#1ABC9C',
    padding: 5
  },
  typeContainer: {
    flex : 1,
    // backgroundColor: 'gray',
    justifyContent: 'space-around'
  },
  typeOptionsWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    flex: 1
  },
  optionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTxt: {
    fontSize: RFValue(18, 790),
    color: 'black',
    fontWeight:'bold'
  },
  optionBtnWrapper: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row'
  },
  roomNumber: {
    width: screen.height * 0.07,
    height: screen.height * 0.07,
    borderRadius: screen.height * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  roomNumberTxt: {
    color: 'white',
    fontSize: RFValue(20, 790),
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalWrapper: {
    width: screen.width * 0.6,
    height: screen.height * 0.4,
    backgroundColor: 'white'
  },
  modalHeaderWrapper: {
    flex: 1,
    backgroundColor: '#2A6C97',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalHeaderTxt: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(25, 790),
  },
  modalBodyWrapper: {
    flex: 2,
  },
  modalBodyRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  modalTitleRowTxt: {
    fontSize: RFValue(12, 790),
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  modalFooterWrapper: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnInput: {
    paddingHorizontal: 20,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28B463',
    borderRadius: 5
  },
  cashInBoxTitleTxt: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: RFValue(18, 790),
  },
  iconClose: {
    color: 'white', 
    fontSize: RFValue(25, 790),
  },
  txtInput:{ 
    height: '80%', 
    width: '90%', 
    borderWidth: 1, 
    backgroundColor: 'white', 
    fontSize: RFValue(15, 790),
    fontWeight: '600', 
    padding: 5 
  },
  iconSetting: {
    fontSize: RFValue(30, 790),
    color: 'white'
  }
})

export default styles;