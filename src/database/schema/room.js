import Realm from 'realm';

export default class Room extends Realm.Object { };

Room.schema = {
  name: 'Room',
  primaryKey: 'id',
  properties: {
    id: 'string',
    roomName: 'string',
    currentStatus: { type: 'string', default: 'available' },
    timeIn: 'int',
    chargedItems: 'ChargedItem[]', 
    note: 'string?',
    tag: { type: 'string', default: 'DG' }, // DG/CD/QD
    sectionRoom: { type: 'string', default: 'quat' }, //quat / lanh
    overnight_price: 'int',
    type: { type: 'string', default: '1bed' },
    cmnd: 'data?'
  }
};