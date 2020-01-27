import realm from '../configRealm';
import moment from 'moment'

export const addChargedItem = ({ addedTime, sectionID, itemKey, roomID, quantity, unitPrice, total, payStatus }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let newRoom = realm.create("ChargedItem", {
          id: sectionID + '_' + itemKey,
          addedTime,
          sectionID,
          itemKey,
          roomID,
          quantity,
          unitPrice,
          total,
          payStatus
        });
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}

export const updateChargedItem = ({ id, addedTime, sectionID, itemKey, quantity, total, payStatus, roomID }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let updatedItem = realm.create("ChargedItem", {
          id,
          addedTime,
          sectionID,
          itemKey,
          quantity,
          total,
          payStatus,
          roomID
        }, 'modified');
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}

export const getChargedItemsBySectionID = ({ sectionId }) => {
  return new Promise((resolve, reject) => {
    try {
      const filterQuery = "sectionID = '" + sectionId + "'"
      let chargedItems = realm.objects('ChargedItem').filtered(filterQuery)
      let chargedItemsData = {}
      for (let item of chargedItems) {
        const itemData = {
          id: item.id,
          addedTime: item.addedTime,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total
        }
        chargedItemsData[item.itemKey] = itemData
      }
      resolve(chargedItemsData)
    } catch (error) {
      console.log("TCL: getChargedItemsBySectionID -> error", error)
      reject(error);
    }
  });
}
