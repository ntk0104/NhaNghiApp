import Realm from 'realm';

export default class ChargedItem extends Realm.Object { };

ChargedItem.schema = {
  name: 'ChargedItem',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    quantity: { type: 'int', default: 0 },
    unitPrice: { type: 'int', default: 0 }
  }
};