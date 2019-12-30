import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  btnSetting: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  },
  leftMenu: {
    width: screen.width - 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }

})

export default styles;