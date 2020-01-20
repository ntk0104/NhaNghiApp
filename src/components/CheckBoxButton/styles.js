import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#BFC9CA'
  },
  titleTxt:{
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default styles;