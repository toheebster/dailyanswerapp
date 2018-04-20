import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import dailiesJSON from '../dailyprod.json'

export default class DailyAnswerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailies: {} // short for devotionals
    }
    this.maxDate = this.getMaxDate()
  }

  render() {
    return (
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
          futureScrollRange={3}
          hideKnob={false}
        />
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


  loadDailies(day) {
    setTimeout(() => {
      for (var i = -1; i < 30; i++) {
        const timeInX = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(timeInX);
          this.state.dailies[strTime] = [] // if no daily for that day - change later because every available day must have a daily
          var daily = dailiesJSON[strTime]
          if (daily) {
            console.log(`height for daily is ${this.getHeightForDaily(daily)}`)
            console.log(`the screen width ${Dimensions.get('window').width}`)
            daily.height = this.getHeightForDaily(daily)
            this.state.dailies[strTime].push(daily)
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
    let roughEstimateOfCharactersPerLine = 50
    let heightBuffer = 320
    let numberOfCharactersInDaily = this.getCharacterCountForDaily(daily)
    let numberOfLinesInDaily = numberOfCharactersInDaily / roughEstimateOfCharactersPerLine
    let height = numberOfLinesInDaily * heightPerLine
    return height + heightBuffer
    console.log(`the screen width ${Dimensions.get('window').width}`)
  }

  getHeightPerLine() {
    let screenWidth = this.getScreenWidth()
    if (screenWidth > 370 && screenWidth < 400) { // iphone x & 6/7 - 375
      return 17
    }
    else if (screenWidth > 400 && screenWidth < 415) { // iphone 6/7 plus
      return 15
    }
    else {// (screenWidth > 300 && screenWidth < 325) { // iphone 5 & 4
      return 21
    }
  }

  getScreenWidth() {
    return Dimensions.get('window').width
  }

  getCharacterCountForDaily(daily) {
    var count = 0;
    const values = Object.keys(daily).map(key => count += daily[key].length)
    console.log(count)
    return count
  }

  renderItem(daily) {
    return (
      <View style={[styles.daily, {height: daily.height}]}>
      <View>
        <Text style={styles.titleStyle}>{daily.title}{"\n"}</Text>
        <Text style={styles.passageStyle}>{daily.passage}{"\n"}</Text>
        <Image
          style={styles.delimiter}
          source={require('./img/delimiter.png')}
        />
        <Text style={styles.contentStyle}>{"\n"}{daily.content}{"\n"}</Text>
      </View>
        <View>
          <View>
            <Text style={styles.ampStyle}>{"Application: "}{daily.application}</Text>
          </View>
          <View>
            <Text style={styles.ampStyle}>{"Memory Verse: "}{daily["memory-verse"]}</Text>
          </View>
          <View>
            <Text style={styles.ampStyle}>{"Prayer: "}{daily.prayer}</Text>
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
    borderRadius: 15,
    padding: 10,
    marginRight: 10, // toheeb this is where you edit this bubble thingy that the words are in
    marginLeft: 10,
    marginTop: 17,
    borderWidth: 3,
    borderColor: '#e3e2e9',
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
  passageStyle: {fontSize: 12, fontFamily: 'Hiragino Sans', fontWeight: '100'},
  contentStyle: { fontFamily: 'Hiragino Sans', fontSize: 12, fontWeight: '400'},
  ampStyle: { fontFamily: 'Hiragino Sans', fontSize: 12, fontWeight: '500', color: '#333333'},
  delimiter: { // maintain width/height 20% ratio
    alignSelf: 'center',
    width: 100,
    height: 20
  },

});
