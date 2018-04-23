
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
  leftAlignmentForDevice: getLeftAlignmentForDevice(),
  heightPerLineForDevice: getHeightPerLineForDevice()
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

export function DeviceTypeIs(type) {
  return DeviceType() === type
}

function getLeftAlignmentForDevice() {
  if (DeviceTypeIs(DeviceModel.IPHONE_PLUSX)) { // plus
    return -104
  }
  else if (DeviceTypeIs(DeviceModel.IPHONE_REGULAR)) { // regular
     return -147
  }
  else if (DeviceTypeIs(DeviceModel.IPHONE_BABY)) {
    return -197
  }
  else if (DeviceTypeIs(DeviceModel.IPAD_9POINT7)) {
    return 250
  }
  else if (DeviceTypeIs(DeviceModel.IPAD_10POINT5)) {
    return 313
  }
  else if (DeviceTypeIs(DeviceModel.IPAD_12POINT9)) {
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
    default:
      return 21

  }
}

function fontSizeForDevice() {
  if (DeviceTypeIs(DeviceModel.IPHONE_PLUSX)) {
    return -104
  }
  else if (DeviceTypeIs(DeviceModel.IPHONE_REGULAR)) {
     return -147
  }
  else if (DeviceTypeIs(DeviceModel.IPHONE_BABY)) {
    return -197
  }
  else if (DeviceTypeIs(DeviceModel.IPAD_9POINT7)) {
    return 250
  }
  else if (DeviceTypeIs(DeviceModel.IPAD_10POINT5)) {

  }
  else if (DeviceTypeIs(DeviceModel.IPAD_12POINT9)) {

  }
}


export const DeviceWidth = Dimensions.get('window').width
