import { StyleSheet, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#61B4DC'
  },
  btnSetting: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: 'gray',
    borderLeftWidth: 2
  },
  leftMenu: {
    width: screen.width - 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default styles;