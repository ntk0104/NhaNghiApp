import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  roomNumberWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: '100%'
  },
  roomNumberTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default styles;