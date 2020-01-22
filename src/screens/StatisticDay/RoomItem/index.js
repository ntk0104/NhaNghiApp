import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import moment from 'moment'
import SectionHourItem from './SectionHourItem'

export default class StatisticDay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDay: moment().format('DD/MM/YYYY')
    }
  }

  componentDidMount() {

  }

  shouldComponentUpdate(nextprops) {
    if (!_.isEqual(this.props.data, nextprops.data)) {
      return true
    }
    return false
  }

  selectDateFrom = (date) => {
    this.setState({
      selectedDay: date
    })
  }

  getLastName = (name) => {
    let nameComponents = name.split(' ')
    return nameComponents[nameComponents.length - 1]
  }

  render() {
    const { roomID, roomName, hourSection, overnight } = this.props.data
    return (
      <View style={styles.container}>
        <View style={styles.roomHeaderTitle}>
          <Text style={styles.normalTxt}>Phòng: {roomName}</Text>
        </View>
        <View style={styles.hoursSectionContainer}>
          <FlatList
            data={hourSection}
            keyExtractor={(item) => item.timeIn}
            renderItem={({ item }) => <SectionHourItem timeIn={item.timeIn} timeOut={item.timeOut} roomType={item.roomType} total={item.total} />}
            numColumns={2}
            scrollEnabled
            nestedScrollEnabled
          />
        </View>
        <View>
          {
            overnight.map((item) =>
              <View style={styles.overnightContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.normalTxt}>{moment(item.timeIn).format('HH:mm')}</Text>
                  <Icon type="AntDesign" name='arrowright' style={styles.iconArrow} />
                  {
                    item.timeOut != null &&
                    <Text style={styles.normalTxt}>{moment(item.timeOut).format('HH:mm')}</Text>
                  }
                </View>
                {
                  item.guessName != null &&
                  <Text style={styles.normalTxt}>{this.getLastName(item.guessName)}</Text>
                }
                <Text style={styles.normalTxt}>{item.total}</Text>
              </View>
            )
          }

        </View>
      </View>
    )
  }
}
