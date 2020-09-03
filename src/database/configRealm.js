import Realm from 'realm';
import ChargedItem from './schema/chargedItem';
import Room from './schema/room';
import TransactionCash from './schema/transactionCash'
import HistoryRoom from './schema/HistoryRoom'

export default realm = new Realm({schema: [
    Room.schema,
    ChargedItem.schema,
    TransactionCash.schema,
    HistoryRoom.schema
  ]
})
