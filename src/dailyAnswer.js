import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import WelcomeScreen from './welcome'
import { DeviceType, DeviceModel, DeviceWidth } from './helpers'
import { Agenda } from 'react-native-calendars';
import Swiper from 'react-native-swiper';
import dailiesJSON from '../dailyprod.json';

export default class DailyAnswerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailies: {} // short for devotionals
    }
    this.maxDate = this.getMaxDate()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.dailies === nextState.dailies) {
      return false
    }
    return true
  }

  render() {
    return (
      <Swiper
        style={{}}
        showsButtons={false}
        showsPagination={false}
        loop={false}>
        <Agenda
          items ={this.state.dailies}
          loadItemsForMonth = {this.loadDailies.bind(this)}
          selected={this.selectedDay()}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          minDate={'2018-04-01'}
          maxDate={this.getMaxDate()}
          pastScrollRange={0}
          futureScrollRange={2}
          hideKnob={false}
        />
        <WelcomeScreen>
        </WelcomeScreen>
      </Swiper>
    )
  }

  getMaxDate() {
    var keys = Object.keys(dailiesJSON)
    var lastDailyDate = keys[keys.length-1]
    return dailiesJSON[lastDailyDate].date // this is so convoluted
  }

  selectedDay() {
    var today = this.timeToString(new Date())
    return (Date.parse(today) < Date.parse(this.maxDate)) ? today : this.maxDate
  }

  isValidDate(date) {
    return (Date.parse(date) < Date.parse(this.maxDate))
  }

  isBad(object) {
    return object == null
          || object == undefined
          || object == NaN
          || object == ''
  }


  loadDailies(day) {
    setTimeout(() => {
      for (var i = -1; i < 90; i++) {
        const timeInX = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(timeInX);
          this.state.dailies[strTime] = [] // if no daily for that day - change later because every available day must have a daily
          var daily = dailiesJSON[strTime]
          var defaultDailyHeight = this.isBigPhone() ? 1300 : 1500 // baby iphones will need bigger defualt height bc of smaller widths
          if (!this.isBad(daily)) {
            var calculatedHeightForDaily = this.getHeightForDaily(daily)
            if (!daily.height) {
              daily.height = !this.isBad(calculatedHeightForDaily) ? calculatedHeightForDaily : defaultDailyHeight
            }
            this.state.dailies[strTime].push(daily)
          } else {
            // console.log(`Bad daily or date index alert. Date index string is ${strTime}`)
          }
      }
      const newDailies = {};
      Object.keys(this.state.dailies).forEach(key => {newDailies[key] = this.state.dailies[key];});
      this.setState({
        dailies: newDailies
      });
    }, 2000);
  }

  getHeightForDaily(daily) { // TO DO : break logic out for android as well

    // each line for the average screen size is about 50 characters long and about 10pixels tall
    let heightPerLine = this.getHeightPerLine()
    let roughEstimateOfCharactersPerLine = this.getRoughEstimateOfCharactersPerLine()
    let heightBuffer = 345
    let numberOfCharactersInDaily = this.getCharacterCountForDaily(daily)
    let numberOfLinesInDaily = numberOfCharactersInDaily / roughEstimateOfCharactersPerLine
    let height = numberOfLinesInDaily * heightPerLine
    return height + heightBuffer
  }

  getHeightPerLine() {
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

  getRoughEstimateOfCharactersPerLine() { // get this out for ipad
    // ipad 12.9 -> 1024
    // ipad 10.5 -> 834
    // ipad 9.7 -> 768
    console.log(DeviceType())
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

  getScreenWidth() {
    return Dimensions.get('window').width
  }

  isBigPhone() {
    return DeviceWidth > 14
  }

  getCharacterCountForDaily(daily) {
    var count = 0;
    const values = Object.keys(daily).map(key => count += daily[key].length)
    return count
  }

  renderItem(daily) {
    return (
      <View style={[styles.daily, {height: daily.height}]}>
      <View>
        <Text style={styles.titleStyle} allowFontScaling={false}>{daily.title}{"\n"}</Text>
        <Text style={styles.passageStyle}>{daily.passage}{"\n"}</Text>
        <Image
          style={styles.delimiter}
          source={require('./img/delimiter.png')}
        />
        <Text allowFontScaling={false} style={styles.contentStyle}>{"\n"}{daily.content}{"\n\n"}</Text>
        <Image
          style={styles.delimiter}
          source={require('./img/delimiter.png')}
        />
      </View>
        <View>
          <View>
            <Text allowFontScaling={false} style={styles.ampStyle}>{"\n"}{"Application: "}{daily.application}{"\n"}</Text>
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.ampStyle}>{"Memory Verse: "}{daily["memory-verse"]}{"\n"}</Text>
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.ampStyle}>{"Prayer: "}{daily.prayer}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderEmptyDate() {
    // return (
    //   <View style={styles.emptyDate}><Text>No daily answer to display</Text></View>
    // );
    return
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}

const styles = StyleSheet.create({
  daily: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    padding: 5,
    marginRight: 15, // toheeb this is where you edit this bubble thingy that the words are in
    marginLeft: 15,
    marginTop: 17,
    marginBottom: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#d8d1c0', //#d8d1c0
    padding: 15,
    paddingTop: 25
    // borderColor: '#e6f0ff'
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  headers: {
  },
  titleStyle: {fontWeight: 'bold', fontFamily: 'Helvetica-Bold', fontSize: 20, color: '#333333'}, // toheeb change to percentage using npm install react-native-viewport-units --save
  passageStyle: {fontSize: 14, fontFamily: 'Damascus', fontWeight: '400'},
  contentStyle: { fontFamily: 'Damascus', fontSize: 14, fontWeight: '400'},
  ampStyle: { fontFamily: 'Damascus', fontSize: 14, fontWeight: '400'},
  delimiter: { // maintain width/height 20% ratio
    alignSelf: 'center',
    width: 100,
    height: 20
  }

});

AppRegistry.registerComponent('DailyAnswerScreen', () => DailyAnswerScreen);
