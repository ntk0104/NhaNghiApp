import Realm from 'realm';

export default class Room extends Realm.Object { };

Room.schema = {
  name: 'Room',
  primaryKey: 'id',
  properties: {
    id: 'string',
    roomName: 'int',
    currentStatus: { type: 'string', default: 'available' },
    timeIn: 'int',
    chargedItems: 'ChargedItem[]',
    note: 'string?',
    tag: { type: 'string', default: 'DG' },
    fan_hour_price: 'int',
    air_hour_price: 'int',
    overnight_price: 'int',
    limitSection: 'int',
    limitMidnight: 'int',
    type: { type: 'string', default: '1bed' },
    cmnd: 'data?'
  }
};