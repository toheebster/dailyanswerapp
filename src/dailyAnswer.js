import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
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
        // if(this.isValidDate(strTime)) {
          console.log(strTime)
          this.state.dailies[strTime] = [] // if no daily for that day - change later because every available day must have a daily
          var daily = dailiesJSON[strTime]
          if (daily) {
            console.log(`height for daily is ${this.getHeightForDaily(daily)}`)
            daily.height = this.getHeightForDaily(daily)
            this.state.dailies[strTime].push(daily)
          }
        // } else {
        //   continue
        // }
      }
      const newDailies = {};
      Object.keys(this.state.dailies).forEach(key => {newDailies[key] = this.state.dailies[key];});
      this.setState({
        dailies: newDailies
      });
    }, 2000);
  }

  getHeightForDaily(daily) {
    // each line for the average screen size is about 50 characters long and about 10pixels tall
    let roughEstimateOfCharactersPerLine = 50
    let heightPerLine = 17
    let heightForExtraSpace = 350
    let numberOfCharactersInDaily = this.getCharacterCountForDaily(daily)
    let numberOfLinesInDaily = numberOfCharactersInDaily / roughEstimateOfCharactersPerLine
    let height = numberOfLinesInDaily * heightPerLine
    return height + heightForExtraSpace
    // console.log(`the screen width ${Dimensions.get('window').width}`)
  }

  getCharacterCountForDaily(daily) {
    var count = 0;
    const values = Object.keys(daily).map(key => count += daily[key].length)
    console.log(count)
    return count
  }

  renderItem(daily) {
    var titleStyle = {fontWeight: 'bold', fontFamily: 'Helvetica-Bold', fontSize: 20, color: '#333333' // toheeb change to percentage using npm install react-native-viewport-units --save
    }
    var passageStyle = { fontSize: 12, fontFamily: 'Hiragino Sans', fontWeight: '100'
    }
    var contentStyle = { fontFamily: 'Hiragino Sans', fontSize: 12, fontWeight: '400'
    }
    var ampStyle = { fontFamily: 'Hiragino Sans', fontSize: 12, fontWeight: '500', color: '#333333'
    }
    return (
      <View style={[styles.daily, {height: daily.height}]}>
      <View>
        <Text style={titleStyle}>{daily.title}{"\n"}</Text>
        <Text style={passageStyle}>{daily.passage}{"\n"}</Text>
        <Text style={{textAlign: "center"}}>{"---"}{"\n"}</Text>
        <Text style={contentStyle}>{daily.content}{"\n"}</Text>
      </View>
        <View>
          <Text style={ampStyle}>{"Application: "}{daily.application}{"\n"}</Text>
          <Text style={ampStyle}>{"Memory Verse: "}{daily["memory-verse"]}{"\n"}</Text>
          <Text style={ampStyle}>{"Prayer: "}{daily.prayer}</Text>
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

  }
});
