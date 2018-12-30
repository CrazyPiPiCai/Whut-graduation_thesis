import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

import global from "../others/global";

export default class InputTest extends Component {
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
          onChangeText={(text) => {
            global.select_photo[this.props.ID-1] = text;
          }}
        />
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center'
  },
  leftlabel: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15
  },
  TextInput: {
    borderWidth: 1,
    minWidth: 140,
    marginLeft: 5,
    marginTop: 10,
    fontSize: 15
  }
});
