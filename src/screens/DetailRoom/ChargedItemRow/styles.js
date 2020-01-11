import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1, 
    borderBottomColor: '#7F8C8D'
  },
  rowHeader: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyHeader: {
    flex: 3,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,

  },
  totalHeader: {
    flex: 1.5,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textQuantity: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default styles;