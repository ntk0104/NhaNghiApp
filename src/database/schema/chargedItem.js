import Realm from 'realm';

export default class ChargedItem extends Realm.Object { };

ChargedItem.schema = {
  name: 'ChargedItem',
  primaryKey: 'id',
  properties: {
    id: 'string', //sectionID_itemKey
    addedTime: 'int', // thời điểm add item
    sectionID: 'int', // id của section/ timeIn của room
    itemKey: 'string', //water/roomcost/softdrink/beer/instantNoodle/anotherCost
    roomID: 'string',
    quantity: { type: 'int', default: 0 },
    unitPrice: { type: 'int', default: 0 },
    total: { type: 'int', default: 0 }, // tong so tien phai thanh toan cho item nay
    payStatus: { type: 'string', default: 'pending' }, //pending : dang cho tra /paid: da tra /lost : bi an quyt 
  }
};