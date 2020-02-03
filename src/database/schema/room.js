import Realm from 'realm';

export default class Room extends Realm.Object { };

Room.schema = {
  name: 'Room',
  primaryKey: 'id',
  properties: {
    id: 'string',
    roomName: 'string',
    currentStatus: { type: 'string', default: 'available' },
    timeIn: 'int', // use to calculate roomcost
    sectionID: 'int', //use to get refenrence to another object
    // chargedItems: { type: 'object', default: [] },
    // chargedItems: 'ChargedItem[]',
    note: { type: 'string', default: '' },
    tag: { type: 'string', default: 'DG' }, // DG/CD/QD
    advancedPay: { type: 'int', default: 0 }, // DG/CD/QD
    sectionRoom: { type: 'string', default: 'quat' }, //quat / lanh
    overnight_price: 'int',
    type: { type: 'string', default: '1bed' },
    cmnd: { type: 'string', default: '' },
  }
};