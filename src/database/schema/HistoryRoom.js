import Realm from 'realm';

export default class HistoryRoom extends Realm.Object { };

HistoryRoom.schema = {
  name: 'HistoryRoom',
  primaryKey: 'addedTime',
  properties: {
    addedTime: 'int', // status = out => addedTIme = timeOUt
    roomID: 'string',
    roomName: 'string',
    status: 'string', //in/out
    total: { type: 'int', default: 0 }, // in => total = 0; out => total = total
    sectionID: 'int',
    timeIn: 'int', //time get room
    note: { type: 'string', default: '' },
    tag: { type: 'string', default: 'DG' }, // DG/CD/QD
    sectionRoom: { type: 'string', default: 'quat' }, //quat / lanh,
    cmnd: 'data?'
  }
};