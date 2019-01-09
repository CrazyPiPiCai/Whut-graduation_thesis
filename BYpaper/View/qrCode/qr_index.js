import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "apsl-react-native-button";
import { Actions } from "react-native-router-flux";

import global from "../../others/global";

export default class QRCODE extends Component {
  render() {
    return (
      <View style={SelfStyles.container}>
        <Button
          style={SelfStyles.buttonStyle}
          textStyle={SelfStyles.textStyle}
          onPress={() => {
            Actions.qr_main();
          }}
        >
          二维码扫描
        </Button>
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  buttonStyle: {
    borderColor: "#2980b9",
    backgroundColor: "#3498db"
  },
  textStyle: {
    color: "white"
  }
});
