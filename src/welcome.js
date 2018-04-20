import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';

export default class WelcomeModal extends Component {
  state = {
    modalVisible: false
  }

  setModalVisible(visible) {
    var modalVisibility = {modalVisible: visible}
    this.setState(modalVisibility)
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
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
      </View>
    );
  }
}
