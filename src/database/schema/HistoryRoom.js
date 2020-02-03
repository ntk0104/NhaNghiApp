import Realm from 'realm';

export default class HistoryRoom extends Realm.Object { };

HistoryRoom.schema = {
  name: 'HistoryRoom',
  primaryKey: 'sectionID',
  properties: {
    roomID: 'string',
    roomName: 'string',
    total: { type: 'int', default: 0 }, // in => total = 0; out => total = total
    sectionID: 'int',
    timeIn: { type: 'int', default: 0 }, //time get room
    timeOut: { type: 'int', default: 0 }, //timeOut get room
    note: { type: 'string', default: '' },
    tag: { type: 'string', default: 'DG' }, // DG/CD/QD
    sectionRoom: { type: 'string', default: 'quat' }, //quat / lanh,
    cmnd: { type: 'string', default: '' }
  }
};