import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HeadlineTest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text style={SelfStyles.headline}>{this.props.titleText}</Text>
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:'center'
  },
  headline: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 10
  },
});
