import Realm from 'realm';
import ChargedItem from './schema/chargedItem';
import Room from './schema/room';
import TransactionCash from './schema/transactionCash'

export default realm = new Realm({schema: [
    Room,
    ChargedItem,
    TransactionCash
  ]
})
