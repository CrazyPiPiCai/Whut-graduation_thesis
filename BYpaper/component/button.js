import React, { Component } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

import global from '../others/global';

export default class ButtonTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      labelText: ""
    };
  }
  _postData() {
    console.log('发送信息！')
  }
  //获取当前时间
  _getmyDate() {
    var date = new Date();
  
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var hour =  date.getHours().toString();
    var minute = date.getMinutes().toString();
  
    return year+'年'+month+'月'+day+'日'+' '+hour+':'+minute;
  };
  _action(para) {
    switch(para) {
      case '保存':
      global.finalText.push(this._getmyDate());
      global.finalText.push('当前操作人员');
      return alert(global.finalText);
      break;
      case '提交':
      return alert('已经提交！');
      break;
    }
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
    justifyContent:'center',
  }
});
