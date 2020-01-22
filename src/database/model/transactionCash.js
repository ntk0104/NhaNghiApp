import realm from '../configRealm';
import moment from 'moment'

export const addTransaction = ({ type, title, total }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let newTransaction = realm.create("TransactionCash", {
          addedTime: moment().valueOf(),
          type,
          title,
          total
        });
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}

export const getTotalPaidMoney = () => {
  return new Promise((resolve, reject) => {
    try {
      let sections = realm.objects('ChargedItem').filtered('payStatus = "paid"')
      let totalPaidMoney = 0
      for (let section of sections) {
        totalPaidMoney += section.total
      }

      let advancedPayments = realm.objects('Room').filtered('advancedPay > 0')
      for (let payment of advancedPayments) {
        totalPaidMoney += payment.advancedPay
      }

      resolve(totalPaidMoney)
    } catch (error) {
      console.log("TCL: getTotalPaidMoney -> error", error)
      reject(error);
    }
  });
}

export const getCurrentMoneyInBox = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let transactions = realm.objects('TransactionCash')
      let totalMoneyInBox = await getTotalPaidMoney()
      for (let transaction of transactions) {
        if (transaction.type === 'withdraw') {
          totalMoneyInBox -= transaction.total
        } else {
          totalMoneyInBox += transaction.total
        }
      }
      resolve(totalMoneyInBox)
    } catch (error) {
      console.log("TCL: getCurrentMoneyInBox -> error", error)
      reject(error);
    }
  });
}

export const getHistoryWithdrawAndDeposit = (timestampOfDay) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = 'addedTime > ' + timestampOfDay
      let transactions = realm.objects('TransactionCash').filtered(query)
      let returnedData = []
      for (let transaction of transactions) {
        returnedData.push({
          addedTime: transaction.addedTime,
          type: transaction.type,
          title: transaction.title,
          total: transaction.total
        })
      }
      resolve(returnedData)
    } catch (error) {
      console.log("TCL: getHistoryWithdrawAndDeposit -> error", error)
      reject(error);
    }
  });
}