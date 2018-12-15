import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

import global from '../others/global';

export default class TextInputTest extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      labelText: ""
    };
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text style={SelfStyles.leftlabel}>{this.props.titleText} :</Text>
        <TextInput style={SelfStyles.TextInput} onChangeText={(text) => {global.finalText.push(text)}}/>
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  leftlabel: {
    marginTop: 5,
    marginLeft: 10
  },
  TextInput: {
    borderWidth:1,
    borderRadius: 4,
    minWidth:100,
    marginLeft:5,
    marginTop:5
  }
});
