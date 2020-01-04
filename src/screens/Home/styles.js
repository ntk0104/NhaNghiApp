import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row'
  },
  leftSideContent: {
    flex: 7,
    backgroundColor: 'blue'
  },
  rightSideContent: {
    flex: 3,
    backgroundColor: 'red'
  },
})

export default styles;