import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Button from "apsl-react-native-button";
import { Actions } from 'react-native-router-flux';

import global from "../others/global";

export default class ButtonTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      labelText: ""
    };
  }
  _action(para) {
    switch (para) {
      case "搜索":
        Actions.one_photo_result();
        break;
      case "保存":
        console.log('ok');
        break;
      case "提交":
        if (this.props.identity === '质量反馈') {
          this._postImageData()
        } else if (this.props.identity === '完工反馈') {
          this._posttextData()
        }
        break;
    }
  }
  //post提交
  _postImageData() {
    let parameters = new FormData();
    parameters.append("data1", `${global.Info_quality_text[0]}`);
    parameters.append("data2", `${global.Info_quality_text[1]}`);
    parameters.append("data3", `${global.Info_quality_text[2]}`);
    parameters.append("data4", `${global.Info_quality_text[3]}`);
    let file = {uri: `${global.imagePath}`, type: 'application/octet-stream', name: 'image.jpg'};
    parameters.append("file", file);

    fetch("http://129.28.79.59:3000/image", {
      method: "POST",
      body: parameters
    })
      .then((result) => result.json())
      .then((data) => {
        if(data.code === 0) {
          Alert.alert('提交成功！')
        } else {
          Alert.alert('提交失败！')
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error");
      });
  }
  _posttextData() {
    let parameters = new FormData();
    parameters.append("data1", `${global.Info_completion_text[0]}`);
    parameters.append("data2", `${global.Info_completion_text[1]}`);
    parameters.append("data3", `${global.Info_completion_text[2]}`);
    parameters.append("data4", `${global.Info_completion_text[3]}`);
    parameters.append("data5", `${global.Info_completion_text[4]}`);
    parameters.append("data6", `${global.Info_completion_text[5]}`);

    fetch("http://129.28.79.59:3000/formdata", {
      method: "POST",
      body: parameters
    })
      .then((result) => result.text())
      .then((data) => {
        Alert.alert(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error");
      });
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Button
          style={SelfStyles.buttonStyle}
          textStyle={SelfStyles.textStyle}
          onPress={() => {
            this._action(this.props.titleText);
          }}>
          {this.props.titleText}
        </Button>
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonStyle: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db'
  },
  textStyle: {
    color: 'white',
  }
});
