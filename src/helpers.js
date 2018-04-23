
import { Dimensions } from 'react-native';

export const DeviceModel = {
  IPHONE_BABY: 'iphone-baby',
  IPHONE_PLUSX: 'iphone-plusX',
  IPHONE_REGULAR: 'iphone-regular',
  IPAD_12POINT9: 'ipad-12.9',
  IPAD_10POINT5: 'ipad-10.5',
  IPAD_9POINT7: 'ipad-9.7',
  UNKNOWN: 'unknown',
}

export const Device = {
  leftAlignmentForDate: getLeftAlignmentForDateForDevice(),
  heightPerLine: getHeightPerLineForDevice(),
  roughEstimateOfCharactersPerLine: getRoughEstimateOfCharactersPerLineForDevice(),
  contentFontSize: getContentFontSizeForDevice(),
  dateFontSize: getDateFontSizeForDevice(),
  dailyTitleFontSize: getDailyTitleFontSizeForDevice(),
  width: Dimensions.get('window').width
}

export function DeviceType() {
  var width = Dimensions.get('window').width
  if (width < 325) { // baby iphone
    return DeviceModel.IPHONE_BABY
  }
  else if (width > 400 & width < 420) { // plusX
    return DeviceModel.IPHONE_PLUSX
  }
  else if (width > 370 && width < 400) {
    return DeviceModel.IPHONE_REGULAR
  }
  else if (width > 1000) { // ipad  12.9
    return DeviceModel.IPAD_12POINT9
  }
  else if (width > 800) { // ipad 10.5
    return DeviceModel.IPAD_10POINT5
  }
  else if (width > 760) { // ipad 9.7
    return DeviceModel.IPAD_9POINT7
  }
  else {
    return DeviceModel.UNKNOWN
  }
}

export function isDeviceType(type) {
  return DeviceType() === type
}

function getLeftAlignmentForDateForDevice() {
  if (isDeviceType(DeviceModel.IPHONE_PLUSX)) { // plus
    return -104
  }
  else if (isDeviceType(DeviceModel.IPHONE_REGULAR)) { // regular
     return -147
  }
  else if (isDeviceType(DeviceModel.IPHONE_BABY)) {
    return -197
  }
  else if (isDeviceType(DeviceModel.IPAD_9POINT7)) {
    return 250
  }
  else if (isDeviceType(DeviceModel.IPAD_10POINT5)) {
    return 313
  }
  else if (isDeviceType(DeviceModel.IPAD_12POINT9)) {
    return 500
  }
  else { // baby
    return  -197
  }
}

function getHeightPerLineForDevice() {
  switch (DeviceType()) {
    case DeviceModel.IPHONE_REGULAR:
      return 17
      break
    case DeviceModel.IPHONE_PLUSX:
      return 15
      break
    case DeviceModel.IPHONE_BABY:
      return 21
      break
    case DeviceModel.IPAD_12POINT9:
      return 32
    default:
      return 21

  }
}

function getContentFontSizeForDevice() {
  if (isDeviceType(DeviceModel.IPHONE_PLUSX)) {
    return 14
  }
  else if (isDeviceType(DeviceModel.IPHONE_REGULAR)) {
     return 14
  }
  else if (isDeviceType(DeviceModel.IPHONE_BABY)) {
    return 14
  }
  else if (isDeviceType(DeviceModel.IPAD_9POINT7)) {
    return 18.5
  }
  else if (isDeviceType(DeviceModel.IPAD_10POINT5)) {
    return 18
  }
  else if (isDeviceType(DeviceModel.IPAD_12POINT9)) {
    return 22
  }
}

function getRoughEstimateOfCharactersPerLineForDevice() { // get this out for ipad
  // ipad 12.9 -> 1024
  // ipad 10.5 -> 834
  // ipad 9.7 -> 768
  switch (DeviceType()) {
    case DeviceModel.IPHONE_BABY:
      return 43
      break
    case DeviceModel.IPHONE_REGULAR:
      return 44
      break
    case DeviceModel.IPHONE_PLUSX:
      return 45
      break
    case DeviceModel.IPAD_12POINT9:
      return 90
      break
    case DeviceModel.IPAD_10POINT5:
      return 80
      break
    case DeviceModel.IPAD_9POINT7:
      return 65
      break
    default:
      return 60
  }
}

function getDateFontSizeForDevice() {

  switch (DeviceType()) {
    case DeviceModel.IPAD_12POINT9:
      return 38
      break
    case DeviceModel.IPAD_10POINT5:
      return 30
      break
    case DeviceModel.IPAD_9POINT7:
      return 27
      break
    default:
      return 22
  }
}

function getDailyTitleFontSizeForDevice() {

  switch (DeviceType()) {
    case DeviceModel.IPAD_12POINT9:
      return 34
      break
    case DeviceModel.IPAD_10POINT5:
      return 26
      break
    case DeviceModel.IPAD_9POINT7:
      return 23
      break
    default:
      return 20
  }
}

function getDefaultHeightForDailyForDevice() {
  switch (DeviceType()) {
    case DeviceModel.IPHONE_BABY:
      return 1300
      break
    case DeviceModel.IPHONE_REGULAR:
      return 1400
      break
    case DeviceModel.IPHONE_PLUSX:
      return 1300
      break
    case DeviceModel.IPAD_12POINT9:
      return 1500
      break
    case DeviceModel.IPAD_10POINT5:
      return 1500
      break
    case DeviceModel.IPAD_9POINT7:
      return 1500
      break
    default:
      return 1500
  }
}
