import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon, CheckBox } from 'native-base'
import _ from 'lodash'

export default class CheckBoxButton extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { 
      width, 
      height, 
      checked, 
      title,
      selectedBackground,
      unSelectedBackground,
      //actions
      onSelect 
    } = this.props
    return (
      <TouchableOpacity activeOpacity={0.7} style={[styles.container, this.props.style, { width, height, backgroundColor: checked ? selectedBackground : unSelectedBackground }]}>
        <CheckBox checked={checked} color="green" onPress={onSelect} />
        <Text style={[styles.titleTxt, { marginLeft: 20 }]}>{title}</Text>
      </TouchableOpacity>
    )
  }
}
