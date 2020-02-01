/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base'
import styles from './styles'
import { updateRoomInfoRequest, getRoomInfoRequest, updateHistoryRoomRequest } from '../../redux/actions/index'
import { connect } from 'react-redux';

class LiveCamera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      turningOnFlash: false,
      pathImg: null,
      roomID: null,
      sectionID: null,
      cmnds: null
    }
  }

  componentDidMount() {
    const roomID = this.props.navigation.getParam('roomID')
    const sectionID = this.props.navigation.getParam('sectionID')
    const cmnds = this.props.navigation.getParam('cmnd')
    this.setState({ roomID, sectionID, cmnds })
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ pathImg: data.uri });
    }
  };

  _requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      return result === PermissionsAndroid.RESULTS.GRANTED || result === true
    }
    return true
  }

  toggleFlash = () => {
    this.setState({ turningOnFlash: !this.state.turningOnFlash })
  }

  closeCamera = () => {
    this.setState({
      turningOnFlash: false,
      pathImg: null
    }, () => {
      this.props.navigation.goBack()
    })
  }

  clearPicture = () => {
    this.setState({
      turningOnFlash: false,
      pathImg: null
    })
  }

  addImg = () => {
    this.props.updateRoomInfoRequestHandler({
      id: this.state.roomID,
      cmnd: this.state.cmnds ? this.state.cmnds + ';' + this.state.pathImg : this.state.pathImg
    })
    this.props.updateHistoryRoomRequestHandler({
      sectionID: this.state.sectionID,
      cmnd: this.state.cmnds ? this.state.cmnds + ';' + this.state.pathImg : this.state.pathImg
    })
    this.props.navigation.goBack()
    this.props.getRoomInfoRequestHandler({ id: this.state.roomID })
  }

  render() {
    const { turningOnFlash, pathImg } = this.state
    return (
      <View style={styles.container}>
        {
          !pathImg ?
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={turningOnFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              <View style={styles.transparentContent}>
                <View style={styles.toolbarWrapper}>
                  <TouchableOpacity onPress={this.takePicture} style={styles.btnTool} onPress={this.closeCamera}>
                    <Icon type="AntDesign" name="closecircleo" style={styles.iconClose} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.takePicture} style={styles.btnTool} onPress={this.toggleFlash}>
                    {
                      turningOnFlash ?
                        <Icon type="Ionicons" name="ios-flash-off" style={styles.iconClose} />
                        :
                        <Icon type="Ionicons" name="ios-flash" style={styles.iconClose} />
                    }
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.takePicture} style={styles.btnCamera} onPress={this.takePicture}>
                  <Icon type="Entypo" name="camera" style={styles.iconCamera} />
                </TouchableOpacity>
              </View>
            </RNCamera>
            :
            <View style={styles.previewImgContainter}>
              <ImageBackground source={{ uri: pathImg }} style={{ height: '100%', resizeMode: 'contain' }}>
                <View style={[styles.toolbarWrapper, { marginTop: 20 }]}>
                  <TouchableOpacity onPress={this.takePicture} style={styles.btnTool} onPress={this.clearPicture}>
                    <Icon type="FontAwesome5" name="trash-alt" style={styles.iconClose} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.takePicture} style={styles.btnTool} onPress={this.addImg}>
                    <Icon type="AntDesign" name="check" style={styles.iconClose} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
        }
      </View>
    );
  }
};


const mapDispatchToProps = dispatch => ({
  updateRoomInfoRequestHandler: payload => dispatch(updateRoomInfoRequest(payload)),
  getRoomInfoRequestHandler: payload => dispatch(getRoomInfoRequest(payload)),
  updateHistoryRoomRequestHandler: (payload) => dispatch(updateHistoryRoomRequest(payload)),
})

export default connect(null, mapDispatchToProps)(LiveCamera)

