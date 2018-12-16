import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

import global from "../others/global";

export default class TextInputTest extends Component {
  constructor(props) {
    super(props);
  }
  _editableToBool(){
    if(this.props.editable == 1) {
      return true
    } else {
      return false
    }
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text style={SelfStyles.leftlabel}>{this.props.titleText} :</Text>
        <TextInput
          style={SelfStyles.TextInput}
          maxLength={this.props.maxLength}
          defaultValue={this.props.defaultValue}
          editable={this._editableToBool()}
          placeholder={this.props.placeholder}
          onChangeText={(text) => {
            global.customInput.push(text);
          }}
        />
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  leftlabel: {
    marginTop: 10,
    marginLeft: 10
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 4,
    minWidth: 100,
    marginLeft: 5,
    marginTop: 10
  }
});
