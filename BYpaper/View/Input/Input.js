import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";

import LabelTest from "../../component/label";
import HeadlineTest from "../../component/headline";
import ButtonTest from "../../component/button";
import TextInputTest from "../../component/textInput";
 
// 关闭全部黄色警告
console.disableYellowBox = true

type Props = {};
export default class InputView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      data: []
    };
    this.DynamicLoading = this.DynamicLoading.bind(this);
  }
  componentDidMount() {
    fetch(`http://localhost:3000/select?sheet_name=input_layout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
            jsonNumber: jsonData.length,
            data: jsonData
          });
      })
      .catch((error) => {
        alert(error);
      });
  }
  //动态加载
  DynamicLoading() {
    const result = [];
    for (var i = 0; i < this.state.jsonNumber; i++) {
      const { id, type, title, maxLength, defaultValue, editable, placeholder } = this.state.data[i];
      switch (type) {
        case "headline":
          result.push(<HeadlineTest key={id} titleText={title} />);
          break;
        case "textInput":
          result.push(<TextInputTest key={id} titleText={title} maxLength={maxLength} defaultValue={defaultValue} editable={editable} placeholder={placeholder} />);
          break;
        case "button":
          result.push(<ButtonTest key={id} titleText={title} />);
          break;
      }
    }
    return result.sort((a, b) => a.key - b.key);
  }
  //测试组件渲染
  render() {
    return (
      <View style={WebTestStyles.container}>
        <View style={WebTestStyles.component}>{this.DynamicLoading()}</View>
      </View>
    );
  }
}
const WebTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  component: {
    marginTop: 10,
    marginLeft: 10
  }
});
