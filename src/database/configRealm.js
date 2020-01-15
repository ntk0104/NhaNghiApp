import Realm from 'realm';
import ChargedItem from './schema/chargedItem';
import Room from './schema/room';

export default realm = new Realm({schema: [
    Room,
    ChargedItem,
  ]
})
