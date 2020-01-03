import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  roomNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  roomNumberTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  timeNumberTxt: {
    color: 'white',
    fontSize: 15,
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