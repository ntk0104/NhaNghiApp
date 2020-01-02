import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    flex: 1
  }
})

export default styles;