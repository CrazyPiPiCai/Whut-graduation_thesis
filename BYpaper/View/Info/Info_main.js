import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import {Actions} from 'react-native-router-flux';

import LabelTest from "../../component/label";
import ButtonTest from "../../component/button";
import TextInputTest from "../../component/textInput";
import DropdownTest from "../../component/dropdown";
import PhotoTest from "../../component/photo";

import global from '../../others/global'

// 关闭全部黄色警告
console.disableYellowBox = true

type Props = {};
export default class InfoView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      data: []
    };
    this.DynamicLoading = this.DynamicLoading.bind(this);
  }
  componentDidMount() {
    this._fetLayout();
  }
  //网络请求-加载配置表信息
  _fetLayout() {
    fetch(`http://129.28.79.59:3000/select?sheet_name=${this.props.passData}`, {
      method: "GET"
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
      const { ID, type, title, dataSource, title_size } = this.state.data[i];
      switch (type) {
        case "label":
          result.push(<LabelTest key={ID} titleText={title} ID={ID} title_size={title_size} />);
          break;
        case "textInput":
          result.push(<TextInputTest key={ID} titleText={title} ID={ID} />);
          break;
        case "button":
          result.push(<ButtonTest key={ID} titleText={title} identity={this.props.identity} />);
          break;
        case "dropDown":
          result.push(<DropdownTest key={ID} titleText={title} net_api={dataSource} ID={ID} title_size={title_size} />);
          break;
        case "photo":
          result.push(<PhotoTest key={ID} titleText={title} ID={ID} title_size={title_size} />);
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
    backgroundColor: '#fff'
  },
  component: {
    marginTop: 5,
    marginLeft: 10
  }
});
