/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, StatusBar } from 'react-native';
import { Icon } from 'native-base'
import styles from './styles'
import ImageViewer from 'react-native-image-zoom-viewer';


export default class ViewCamera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urlImgs: [],
      //   images: [{
      //     url: this.state.urlImg,
      //     // props: {
      //     //     // Or you can set source directory.
      //     //     source: require(this.state.urlImage)
      //     // }
      // }]
    }
  }

  componentDidMount() {
    const urlImage = this.props.navigation.getParam('urlImg')
    const listURLs = []
    urlImage.forEach(element => {
      listURLs.push({url: element})
    });
    this.setState({ urlImgs: listURLs })
  }

  render() {
    const { urlImgs } = this.state
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.previewImgContainter}>
          {/* <ImageBackground source={{ uri: urlImg }} style={{ height: '100%', resizeMode: 'contain' }}>
            <TouchableOpacity onPress={this.takePicture} style={styles.btnTool} onPress={() => this.props.navigation.goBack()}>
              <Icon type="AntDesign" name="closecircleo" style={styles.iconClose} />
            </TouchableOpacity>
          </ImageBackground> */}
          <View style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                <TouchableOpacity onPress={this.takePicture} style={{width: 120, height: '100%', flex: 1, paddingLeft: 20, justifyContent: 'center' }} onPress={() => this.props.navigation.goBack()}>
                  <Icon type="AntDesign" name="closecircleo" style={styles.iconClose} onPress={() => this.props.navigation.goBack()} />
                </TouchableOpacity>
              </View>
          {
            urlImgs.length > 0 &&
            <ImageViewer imageUrls={urlImgs} />
          }
        </View>
      </View>
    );
  }
};


