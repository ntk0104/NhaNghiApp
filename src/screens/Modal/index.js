// import _ from 'lodash';
import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import moment from 'moment';
import {Icon, CheckBox} from 'native-base';

import styles from './styles';
import {appConfig} from '../../utils/index';
import {
  getRoomsDataRequest,
  updateRoomInfoRequest,
  addChargedItemRequest,
  addHistoryItemRequest,
  getHistoryListRequest,
} from '../../redux/actions/index';
import {connect} from 'react-redux';

class ModalGetRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: null,
      selectedSectionType: 'DG',
      selectedRoomType: 'quat',
      gettingRoomName: null,
      currentNote: '',
      gettingRoomID: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const modalType = navigation.getParam('modalType');
    const gettingRoomName = navigation.getParam('gettingRoomName');
    const gettingRoomID = navigation.getParam('gettingRoomID');
    this.setState({modalType, gettingRoomName, gettingRoomID});
  }

  closeGetRoomScreen = () => {
    const {navigation} = this.props;
    this.setState(
      {
        selectedSectionType: 'DG',
        selectedRoomType: 'quat',
        gettingRoomName: null,
        currentNote: '',
        gettingRoomID: null,
      },
      () => navigation.goBack(),
    );
  };

  selectSectionType = sectionType => {
    if (sectionType == 'DG') {
      this.setState({
        selectedSectionType: sectionType,
        selectedRoomType: 'quat',
      });
    } else if (sectionType == 'CD') {
      this.setState({
        selectedSectionType: sectionType,
        selectedRoomType: 'lanh',
      });
    } else {
      this.setState({
        selectedSectionType: sectionType,
        selectedRoomType: 'lanh',
      });
    }
  };

  selectRoomType = roomType => {
    this.setState({
      selectedRoomType: roomType,
    });
  };

  onSubmitGetRoom = () => {
    const currentTimestamp = moment().valueOf();
    const updatedInfo = {
      id: this.state.gettingRoomID,
      currentStatus: 'busy',
      timeIn: currentTimestamp,
      sectionID: currentTimestamp,
      chargedItems: [],
      note:
        this.state.currentNote.length > 0 ? this.state.currentNote + ',' : '',
      tag: this.state.selectedSectionType,
      sectionRoom: this.state.selectedRoomType,
      cmnd: '',
    };

    this.props.updateRoomInfoRequestHandler(updatedInfo);

    const roomCostItem = {
      addedTime: updatedInfo.sectionID,
      sectionID: updatedInfo.sectionID,
      itemKey: 'roomcost',
      roomID: this.state.gettingRoomID,
      quantity: 1,
      unitPrice: 0,
      total: 0,
      payStatus: 'pending',
    };
    const waterCostItem = {
      addedTime: updatedInfo.sectionID,
      sectionID: updatedInfo.sectionID,
      itemKey: 'water',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitWaterPrice,
      total: 0,
      payStatus: 'pending',
    };
    const softdrinkCostItem = {
      addedTime: updatedInfo.sectionID,
      sectionID: updatedInfo.sectionID,
      itemKey: 'softdrink',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitSoftDrinkPrice,
      total: 0,
      payStatus: 'pending',
    };
    const beerCostItem = {
      addedTime: updatedInfo.sectionID,
      sectionID: updatedInfo.sectionID,
      itemKey: 'beer',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitBeerPrice,
      total: 0,
      payStatus: 'pending',
    };
    const instantNoodleCostItem = {
      addedTime: updatedInfo.sectionID,
      sectionID: updatedInfo.sectionID,
      itemKey: 'instantNoodle',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitInstantNoodle,
      total: 0,
      payStatus: 'pending',
    };
    const anotherCostCostItem = {
      addedTime: updatedInfo.sectionID,
      sectionID: updatedInfo.sectionID,
      itemKey: 'anotherCost',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: 0,
      total: 0,
      payStatus: 'pending',
    };

    this.props.addChargedItemRequestHandler(roomCostItem);
    this.props.addChargedItemRequestHandler(waterCostItem);
    this.props.addChargedItemRequestHandler(beerCostItem);
    this.props.addChargedItemRequestHandler(softdrinkCostItem);
    this.props.addChargedItemRequestHandler(instantNoodleCostItem);
    this.props.addChargedItemRequestHandler(anotherCostCostItem);

    this.props.addHistoryItemRequestHandler({
      roomID: this.state.gettingRoomID,
      roomName: this.state.gettingRoomName,
      total: 0,
      sectionID: updatedInfo.timeIn,
      timeIn: updatedInfo.timeIn,
      timeOut: 0,
      note:
        this.state.currentNote.length > 0 ? this.state.currentNote + ',' : '',
      tag: this.state.selectedSectionType,
      sectionRoom: this.state.selectedRoomType,
      cmnd: '',
    });

    this.closeGetRoomScreen();
    this.timeout = setTimeout(() => {
      this.props.getRoomsDataRequestHandler();
      this.props.getHistoryListRequestHandler();
      clearTimeout(this.timeout)
    }, 300);
  };

  render() {
    const {gettingRoomName, selectedSectionType, selectedRoomType} = this.state;
    // const { } = this.props
    return (
      <View style={styles.modalContent}>
        <View style={styles.modalTopBar}>
          <View style={styles.modalHeaderTxtWrapper}>
            <Text style={[styles.headerTxt, {marginRight: 20}]}>
              Nhận Phòng
            </Text>
            <View style={styles.roomNumber}>
              <Text style={styles.roomNumberTxt}>{gettingRoomName}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnCloseModal}
            onPress={this.closeGetRoomScreen}>
            <Icon type="AntDesign" name="close" style={styles.iconClose} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.leftBodyContainer}>
            <View style={styles.typeContainer}>
              <Text style={styles.titleTxt}>Loại:</Text>
              <View style={styles.typeOptionsWrapper}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.optionWrapper]}
                  onPress={() => this.selectSectionType('DG')}>
                  <View style={styles.optionBtnWrapper}>
                    <CheckBox
                      checked={selectedSectionType == 'DG'}
                      color="green"
                      onPress={() => this.selectSectionType('DG')}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>DG</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.optionWrapper]}
                  onPress={() => this.selectSectionType('CD')}>
                  <View style={styles.optionBtnWrapper}>
                    <CheckBox
                      checked={selectedSectionType == 'CD'}
                      color="green"
                      onPress={() => this.selectSectionType('CD')}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>CD</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.optionWrapper]}
                  onPress={() => this.selectSectionType('QD')}>
                  <View style={styles.optionBtnWrapper}>
                    <CheckBox
                      checked={selectedSectionType == 'QD'}
                      color="green"
                      onPress={() => this.selectSectionType('QD')}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                      Qua đêm
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.typeContainer}>
              <Text style={styles.titleTxt}>Phòng:</Text>
              <View style={styles.typeOptionsWrapper}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.optionWrapper]}
                  onPress={() => this.selectRoomType('quat')}>
                  <View style={styles.optionBtnWrapper}>
                    <CheckBox
                      checked={selectedRoomType == 'quat'}
                      color="green"
                      onPress={() => this.selectRoomType('quat')}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 20}]}>
                      Quạt
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.optionWrapper]}
                  onPress={() => this.selectRoomType('lanh')}>
                  <View style={styles.optionBtnWrapper}>
                    <CheckBox
                      checked={selectedRoomType == 'lanh'}
                      color="green"
                      onPress={() => this.selectRoomType('lanh')}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 20}]}>
                      Lạnh
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.rightBodyContainer}>
            <Text style={styles.titleTxt}>Ghi chú:</Text>
            <TextInput
              style={{
                height: 100,
                width: '90%',
                borderWidth: 1,
                backgroundColor: 'white',
              }}
              placeholder="Nhập ghi chú"
              onChangeText={text => this.setState({currentNote: text})}
              multiline
              keyboardType="default"
              blurOnSubmit={true}
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btnOK, {backgroundColor: '#E74C3C'}]}
            onPress={this.closeGetRoomScreen}>
            <Text style={styles.headerTxt}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnOK}
            onPress={this.onSubmitGetRoom}>
            <Text style={styles.headerTxt}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRoomsDataRequestHandler: () => dispatch(getRoomsDataRequest()),
  updateRoomInfoRequestHandler: payload =>
    dispatch(updateRoomInfoRequest(payload)),
  addChargedItemRequestHandler: payload =>
    dispatch(addChargedItemRequest(payload)),
  addHistoryItemRequestHandler: payload =>
    dispatch(addHistoryItemRequest(payload)),
  getHistoryListRequestHandler: () => dispatch(getHistoryListRequest()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ModalGetRoom);
