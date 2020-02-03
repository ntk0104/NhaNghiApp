import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  transparentContent: {
    flex: 1, 
    backgroundColor: 'transparent', 
    width: '100%' ,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  toolbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  btnTool: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconClose: {
    fontSize: RFValue(30, 790),
    color: 'white'
  },
  iconCamera: {
    fontSize: RFValue(40, 790),
    color: 'black'
  },
  btnCamera: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  previewImgContainter: {
    flex:1,
    width: '100%',
    backgroundColor: 'black',
  }
})

export default styles;