import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { viewed: false }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.welcomeTextView}>
          <Image
            style={styles.delimiter}
            source={require('./img/delimiter.png')}
          />
          <Text style={styles.welcomeText}>{'\n\n'}Dear Reader,{'\n\n'}
            I celebrate with you as God has ushered you into the New Year 2018.
            I believe that you will experience God’s grace and mercy this year,
            and your testimonies will abound. 2018 will be a year of new beginnings
            for you and you will experience many blessings that may have eluded you in the past year.
            I also look forward to rejoicing with you as you celebrate your miracles this year.
            I have been praying for you that as you use the Daily Answer in your devotional time this year,
            you will experience unspeakable miracles, signs and wonders; and most importantly you
            will have an inner chamber supernatural encounter with the Lord.
            That you may be pulled into the Holy of Hollies with the Lord for a never forgetting moment.
            My prayer is that each day will bring about a new and absolutely refreshing encounter with God in Jesus Name.
            I wish you the best in this New Year and many prosperous days, weeks, and months to come.{"\n\n"}

            Love you always{"\n"}
            Shalom and Remain Blessed,{"\n"}
            Prophetess Talabi{'\n\n'}
          </Text>
          <Image
            style={styles.delimiter}
            source={require('./img/delimiter.png')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcomeTextView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  welcomeText: {
    fontWeight: 'bold',
    fontFamily:
    'Helvetica-Bold',
    fontSize: 15,
    color: '#333333',
    textAlign: 'center'
  },
  delimiter: { // maintain width/height 20% ratio
    alignSelf: 'center',
    width: 100,
    height: 20
  },
});


/*{/* <View style={{marginTop: 22}}>
  <Modal
    animationType="slide"
    transparent={false}
    visible={this.state.modalVisible}
    onRequestClose={() => {
      alert('Modal has been closed')
    }}>
    <View style={{marginTop: 22}}>
      <View>
        <Text>Hello World!</Text>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
          <Text>Hide Modal</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>

  <TouchableHighlight
    onPress={() => {
      this.setModalVisible(true)
    }}>
    <Text>Show Modal</Text>
  </TouchableHighlight>
</View> */
