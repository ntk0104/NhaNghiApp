/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base'
import styles from './styles'
import { updateRoomInfoRequest, getRoomInfoRequest, updateHistoryRoomRequest } from '../../redux/actions/index'
import { connect } from 'react-redux';

export default class ViewCamera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urlImg: null
    }
  }

  componentDidMount() {
    const urlImage = this.props.navigation.getParam('urlImg')
    this.setState({ urlImg: urlImage })
  }

  render() {
    const { urlImg } = this.state
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.previewImgContainter}>
          <ImageBackground source={{ uri: urlImg }} style={{ height: '100%', resizeMode: 'contain' }}>
            <TouchableOpacity onPress={this.takePicture} style={styles.btnTool} onPress={() => this.props.navigation.goBack()}>
              <Icon type="AntDesign" name="closecircleo" style={styles.iconClose} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
};


