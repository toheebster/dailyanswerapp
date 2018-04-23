
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

export const DeviceWidth = Dimensions.get('window').width
