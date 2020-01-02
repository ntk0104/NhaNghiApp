import { StyleSheet } from 'react-native'

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
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FF5B5B',
    borderRadius: 5,
    fontSize: 20
  },
  withdrawTxt: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default styles;