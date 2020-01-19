// deposit and withdraw cashbox
import Realm from 'realm';

export default class TransactionCash extends Realm.Object { };

TransactionCash.schema = {
  name: 'TransactionCash',
  primaryKey: 'addedTime',
  properties: {
    addedTime: 'int', // thời điểm add item
    type: { type: 'string', default: 'withdraw'}, //withdraw/deposit
    title: { type: 'string', default: ''},
    total: { type: 'int', default: 0 }, // tong so tien da them/lay
  }
};