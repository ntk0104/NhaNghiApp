import moment from 'moment'
import { appConfig } from '../utils'

export const calculateNumsNightFrom = (timestampIn, timestampOut) => {
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
}

export const calculateLivingTime = (timestampIn, timestampOut) => {
  const numberOfNights = calculateNumsNightFrom(timestampIn, timestampOut)
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
    const generatedTimeThreshold = checkOutDate + ' 12:' + appConfig.bufferTimeInMinutes + ':00'
    const generatedTimestampThreshold = moment(generatedTimeThreshold).valueOf()
    if (timestampOut > generatedTimestampThreshold) {
      let tmpTimestamp = moment(checkOutDate + ' 12:00:00').valueOf()
      let diffTimestamp2 = timestampOut - tmpTimestamp
      const diffHours2 = Math.floor(moment.duration(diffTimestamp2).asHours())
      if (diffHours2 > 0) {
        diffTimestamp2 = diffTimestamp2 - diffHours2 * 60 * 60 * 1000
      }
      const diffMinutes2 = Math.floor(moment.duration(diffTimestamp2).asMinutes())
      durationObj = {
        nights: numberOfNights,
        hours: diffHours2,
        minutes: diffMinutes2
      }
    } else {
      durationObj = {
        nights: numberOfNights,
        hours: 0,
        minutes: 0
      }
    }

  }
  return durationObj
}

export const generateLivingDuration = (timestampIn, timestampOut) => {
  if (timestampIn != 0) {
    const durationObj = calculateLivingTime(timestampIn, timestampOut)
    const { nights, hours, minutes } = durationObj
    let durationString = ''
    if (nights > 0) {
      durationString += nights + ' đêm - '
    }
    if (hours > 0) {
      durationString += hours + ' giờ - '
    }
    durationString += minutes + ' phút'
    return durationString
  }
  return null
}

export const calculateRoomCostPerHour = (timestampIn, timestampOut, overnight_price, SectionHourCost, additionalHourPrice, type) => {
  const limitHourOfSection1 = appConfig.limitHourSectionTimeInHour // 3 giờ đầu thì 100, quá 3 giờ thì charge thêm
  const limitHourSectionToOvernightInHour = appConfig.limitHourSectionToOvernightInHour  // quá 6 tiếng tính qua đem
  const bufferTime = appConfig.bufferTimeInMinutes // sống có đức, dưới threshold thì coi như ko tính charge thêm level tiếp theo -dvt: phut

  let livingTimeObj = calculateLivingTime(timestampIn, timestampOut)
  const { nights, hours, minutes } = livingTimeObj
  if (nights > 0) {
    return calculateRoomCostOvernight(timestampIn, timestampOut, overnight_price, additionalHourPrice, SectionHourCost)
  } else {
    const livingTimeToSecs = hours * 3600 + minutes * 60
    const limitSectionToSecs = limitHourOfSection1 * 3600 + bufferTime * 60
    const limitSectionToOvernightToSecs = limitHourSectionToOvernightInHour * 3600 + bufferTime * 60
    if (livingTimeToSecs > limitSectionToSecs) {
      if (livingTimeToSecs > limitSectionToOvernightToSecs) {
        return overnight_price
      } else {
        let roomCost = 0
        if (minutes > bufferTime) {
          roomCost = (hours - limitHourOfSection1 + 1) * additionalHourPrice + SectionHourCost
        } else {
          roomCost = (hours - limitHourOfSection1) * additionalHourPrice + SectionHourCost
        }
        if (roomCost > overnight_price) {
          roomCost = overnight_price
        }
        return roomCost
      }
    } else {
      if (type == 'additionalOverNight') {
        let additionalHour = hours
        if (minutes > bufferTime) {
          additionalHour += 1
        }
        return additionalHour * additionalHourPrice
      }
      return SectionHourCost
    }
  }

}

export const calculateRoomCostOvernight = (timestampIn, timestampOut, overnight_price, additionalHourPrice, SectionHourCost) => {
  const bufferTime = appConfig.bufferTimeInMinutes // sống có đức, dưới threshold thì coi như ko tính charge thêm level tiếp theo -dvt: phut
  let numsNight = calculateNumsNightFrom(timestampIn, timestampOut)
  if (numsNight == 0) {
    const currentDate = moment(timestampOut).format('YYYY-MM-DD')
    const generatedTimeInThreshold = currentDate + ' 05:00:00'
    const generatedTimeInstampThreshold = moment(generatedTimeInThreshold).valueOf()
    const generatedTimeOutThreshold = currentDate + ' 12:' + bufferTime + ':00'
    const generatedTimestampOutThreshold = moment(generatedTimeOutThreshold).valueOf()
    if (timestampOut > generatedTimestampOutThreshold && timestampIn < generatedTimeInstampThreshold) {
      let additionalHourCost = calculateRoomCostPerHour(moment(currentDate + ' 12:00:00').valueOf(), timestampOut, overnight_price, SectionHourCost, additionalHourPrice, 'additionalOverNight')
      return overnight_price + additionalHourCost
    } else {
      // without charge additional hour
      return overnight_price
    }
  } else {
    const currentDate = moment(timestampOut).format('YYYY-MM-DD')
    const generatedTimeThreshold = currentDate + ' 12:' + bufferTime + ':00'
    const generatedTimestampThreshold = moment(generatedTimeThreshold).valueOf()
    if (timestampOut > generatedTimestampThreshold) {
      let additionalHourCost = calculateRoomCostPerHour(moment(currentDate + ' 12:00:00').valueOf(), timestampOut, overnight_price, SectionHourCost, additionalHourPrice, 'additionalOverNight')
      return numsNight * overnight_price + additionalHourCost
    }
    return numsNight * overnight_price
  }
}

export const formatVND = (anotherCostValue) => {
  try {
    let intMoney = parseInt(anotherCostValue) * 1000
    // intMoney = intMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    intMoney = intMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return intMoney
  } catch (error) {
    console.log("TCL: formatVND -> error", error)
  }
}