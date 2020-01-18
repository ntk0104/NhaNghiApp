import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import { makeGetRoomsData } from '../../../redux/selectors/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class CashBox extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.totalContainer}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Tiền trong tủ: 3.570.000</Text>
        <TouchableOpacity style={styles.btnWithDraw}>
          <Text style={styles.withdrawTxt}>Rút tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnWithDraw, { backgroundColor: '#3C8F36' }]}>
          <Text style={styles.withdrawTxt}>Thêm tiền</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  roomsData: makeGetRoomsData()
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CashBox)
