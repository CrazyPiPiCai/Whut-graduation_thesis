import React, { Component } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

import global from "../others/global";

export default class ButtonTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      labelText: ""
    };
  }
  //获取当前时间
  _getmyDate() {
    var date = new Date();

    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();

    return year + "年" + month + "月" + day + "日" + " " + hour + ":" + minute;
  }
  _action(para) {
    switch (para) {
      case "保存":
        console.log(global.finalText);
        break;
      case "提交":
        this._postData();
        break;
    }
  }
  //post提交
  _postData() {
    let parameters = new FormData();
    parameters.append("mt", "30013");
    parameters.append("pg", "1");
    parameters.append("ps", "20");

    fetch("http://localhost:3000/formdata", {
      method: "POST",
      body: parameters
    })
      .then(result => {
        if (result.ok) {
          console.log(result);
          result.json().then(obj => {
            console.log(obj);
          });
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Error");
      });
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Button
          title={this.props.titleText}
          color="red"
          onPress={() => {
            this._action(this.props.titleText);
          }}
        />
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    justifyContent: "center"
  }
});
