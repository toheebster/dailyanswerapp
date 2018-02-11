import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { Agenda } from 'react-native-calendars';
import dailiesJSON from '../daily.json'

export default class DailyAnswerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailies: {} // short for devotionals
    }
  }

  render() {
    return (
        <Agenda
          items = {this.state.dailies}
          loadItemsForMonth = {this.loadDailies.bind(this)}
          selected= {this.timeToString(new Date())}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          current={new Date()}
          minDate={'2017-05-10'}
          pastScrollRange={3}
          futureScrollRange={0}
          hideKnob={false}
        />
    )
  }

  loadDailies(day) {
    setTimeout(() => {
      for (var i = -1; i < 30; i++) {
        const timeInX = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(timeInX);
        this.state.dailies[strTime] = [] // if no daily for that day - change later because every available day must have a daily
        const numItems = 1;
        for (let j = 0; j < numItems; j++) {
          // console.log(dailies)
          var daily = dailiesJSON[strTime]
          if (daily) {
            daily.height = Math.max(800, Math.floor(Math.random() * 150))
            this.state.dailies[strTime].push(daily)
          } else {
            this.state.dailies[strTime].push({
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus lorem vel auctor vehicula. Sed consectetur, nunc nec dictum dictum, sapien nisl convallis ipsum, eget tempus turpis quam quis lacus. Donec ac commodo urna, ac vestibulum leo. Integer tincidunt eget sapien eu tincidunt. Etiam sodales in arcu ut consectetur. Maecenas in turpis sagittis, luctus libero a, condimentum mauris. Nullam at justo molestie, sodales enim nec, vehicula semLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus lorem vel auctor vehicula. Sed consectetur, nunc nec dictum dictum, sapien nisl convallis ipsum, eget tempus turpis quam quis lacus. Donec ac commodo urna, ac vestibulum leo. Integer tincidunt eget sapien eu tincidunt. Etiam sodales in arcu ut consectetur. Maecenas in turpis sagittis, luctus libero a, condimentum mauris. Nullam at justo molestie, sodales enim nec, vehicula semLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus lorem vel auctor vehicula. Sed consectetur, nunc nec dictum dictum, sapien nisl convallis ipsum, eget tempus turpis quam quis lacus. Donec ac commodo urna, ac vestibulum leo. Integer tincidunt eget sapien eu tincidunt. Etiam sodales in arcu ut consectetur. Maecenas in turpis sagittis, luctus libero a, condimentum mauris. Nullam at justo molestie, sodales enim nec, vehicula semLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus lorem vel auctor vehicula. Sed consectetur, nunc nec dictum dictum, sapien nisl convallis ipsum, eget tempus turpis quam quis lacus. Donec ac commodo urna, ac vestibulum leo. Integer tincidunt eget sapien eu tincidunt. Etiam sodales in arcu ut consectetur. Maecenas in turpis sagittis, luctus libero a, condimentum mauris. Nullam at justo molestie, sodales enim nec, vehicula sem",
              height: Math.max(800, Math.floor(Math.random() * 150)),
              title: "This is a title"
            });
          }
        }
      }
      const newDailies = {};
      Object.keys(this.state.dailies).forEach(key => {newDailies[key] = this.state.dailies[key];});
      this.setState({
        dailies: newDailies
      });
    }, 1000);
  }

  renderItem(daily) {
    return (
      <View style={[styles.daily, {height: daily.height}]}>
        <Text>{daily.date}</Text>
        <Text>{daily.title}</Text>
        <Text>{daily.content}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
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
    borderColor: '#e6f0ff'
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  headers: {

  }
});
