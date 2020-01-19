import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  roomNumberWrapper: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: '100%'
  },
  roomNumberTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  roomContainer: {
    width: '11%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  part: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5
  },
  tagWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white'
  },
  tagTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default styles;