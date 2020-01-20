import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
    fontSize: RFValue(15, 790),
    fontWeight: 'bold'
  }
})

export default styles;