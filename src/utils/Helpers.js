import moment from 'moment'
import { Storage, constants } from './index'

const Helpers = {
  calculateNumsNightFrom(timestampIn, timestampOut) {
    const dateValue = moment(timestampIn).date()
    const monthValue = moment(timestampIn).month()
    const yearValue = moment(timestampIn).year()
    const timeInMoment = moment([yearValue, monthValue, dateValue])

    const dateValueOut = moment(timestampOut).date()
    const monthValueOut = moment(timestampOut).month()
    const yearValueOut = moment(timestampOut).year()
    const timeOutMoment = moment([yearValueOut, monthValueOut, dateValueOut])

    const numsNights = timeOutMoment.diff(timeInMoment, 'days')
    return numsNights
  },
  calculateLivingTime(timestampIn, timestampOut) {
    const numberOfNights = this.calculateNumsNightFrom(timestampIn, timestampOut)
    let durationObj = {}
    if (numberOfNights == 0) {
      let diffTimestamp = timestampOut - timestampIn
      const diffHours = Math.floor(moment.duration(diffTimestamp).asHours())
      if (diffHours > 0) {
        diffTimestamp = diffTimestamp - diffHours * 60 * 60 * 1000
      }
      const diffMinutes = Math.floor(moment.duration(diffTimestamp).asMinutes())
      durationObj = {
        nights: 0,
        hours: diffHours,
        minutes: diffMinutes
      }
    } else {
      const checkOutDate = moment(timestampOut).format('YYYY-MM-DD')
      const bufferSectionMinutes = Storage.shared().getStorage(constants.bufferTimeInMinutes)
      const generatedTimeThreshold = checkOutDate + ' 12:' + bufferSectionMinutes + ':00'
      const generatedTimestampThreshold = moment(generatedTimeThreshold).valueOf()
      if (timestampOut > generatedTimestampThreshold) {
        let diffTimestamp = moment(checkOutDate + ' 12:00:00').valueOf() - timestampIn
        const diffHours = Math.floor(moment.duration(diffTimestamp).asHours())
        if (diffHours > 0) {
          diffTimestamp = diffTimestamp - diffHours * 60 * 60 * 1000
        }
        const diffMinutes = Math.floor(moment.duration(diffTimestamp).asMinutes())
        durationObj = {
          nights: numberOfNights,
          hours: diffHours,
          minutes: diffMinutes
        }
      }
      durationObj = {
        nights: numberOfNights,
        hours: 0,
        minutes: 0
      }
    }
    console.log(JSON.stringify(durationObj, null, 2));
    return durationObj
  }
}
export default Helpers
