import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F9'
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
  headerTitleTxt: {
    fontSize: RFValue(15, 790),
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
    width: '30%',
    height: '90%',
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  bottomBar: {
    width: '100%',
    height: screen.height * 0.1,
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
    flex: 2.5,
    backgroundColor: '#D5DBDB',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: RFValue(18, 790),
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
    fontSize: RFValue(20, 790),
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
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalReturnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalWrapper: {
    width: screen.width * 0.6,
    height: screen.height * 0.4,
    backgroundColor: 'white'
  },
  modalReturnRoomWrapper: {
    width: screen.width * 0.6,
    height: screen.height * 0.6,
    backgroundColor: 'white'
  },
  modalSwapRoomWrapper: {
    width: screen.width * 0.8,
    height: screen.height * 0.8,
    backgroundColor: 'white'
  },
  modalHeaderWrapper: {
    flex: 1,
    backgroundColor: '#2A6C97',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalBodyWrapper: {
    flex: 2,
  },
  modalSwapRoomWrapper: {
    flex: 6,
    backgroundColor: 'white'
  },
  modalFooterWrapper: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  modalHeaderTxt: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(20, 790),
  },
  btnCloseModal: {
    width: 70,
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C'
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
  btnInput: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28B463',
    borderRadius: 5
  },
  iconBack: {
    color: 'white',
    fontSize: RFValue(25, 790)
  },
  imgCMND: {
    width: screen.height * 0.12,
    height: screen.height * 0.1,
    resizeMode: 'contain',
    marginRight: 10
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
  iconClose: {
    fontSize: RFValue(25, 790),
    color: 'white'
  },
  txtTextInput: {
    height: '80%',
    width: '90%',
    borderWidth: 1,
    backgroundColor: 'white',
    fontSize: RFValue(12, 790),
    fontWeight: '600',
    padding: 5
  },
  btnDeleteRoom: {
    padding: 5,
    paddingHorizontal: 10,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginRight: 10,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#EA1576'
  },
  deleteRoomTxt: {
    fontSize: RFValue(14, 790),
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10
  },
  btnSetting: {
    padding: 10,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#BFC9CA'
  },
  iconSetting: {
    fontSize: RFValue(30, 790),
    color: 'black'
  },
  startDatePicker: {
    width: 147,
    height: '90%',
    justifyContent: "center",
    alignItems: "center"
  },
  iconCamera: {
    fontSize: RFValue(40, 790),
    color: 'black'
  },
  btnCamera: {
    height: '90%',
    width: 80,
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 10
  }
})

export default styles;