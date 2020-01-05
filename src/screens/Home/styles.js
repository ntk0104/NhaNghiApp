import { StyleSheet, Dimensions } from 'react-native'

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
    flex: 7,
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
    flex: 1,
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
    backgroundColor: '#FF5B5B',
    borderRadius: 5,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'

  },
  withdrawTxt: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 10
  },
  modalContent: {
    // width: '95%',
    // height: '95%',
    width: screen.width * 0.85,
    height: screen.height * 0.8,
    backgroundColor: 'white',
    borderRadius: 5
  },
  modalTopBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#28B463',
    flexDirection: 'row'
  },
  modalHeaderTxtWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  modalFooter: {
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#AEB6BF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modalBody: {
    backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'row'
  },
  btnOK: {
    width: 150,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28B463',
    borderRadius: 5
  },
  leftBodyContainer: {
    flex: 3,
    backgroundColor: '#F5B041',
    padding: 10
  },
  rightBodyContainer: {
    flex: 2,
    backgroundColor: '#1ABC9C',
    padding: 10
  },
  typeContainer: {
    flex : 1,
    backgroundColor: 'gray',
    justifyContent: 'space-around'
  },
  typeOptionsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    flex: 1
  },
  optionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTxt: {
    fontSize: 25,
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
  }
})

export default styles;