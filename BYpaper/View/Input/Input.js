import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";

import LabelTest from "../../component/label";
import ButtonTest from "../../component/button";
import TextInputTest from "../../component/textInput";
import DropdownTest from "../../component/dropdown";
import PhotoTest from "../../component/photo";

//忽略警告
//console.ignoredYellowBox = ['ListView is deprecated and will be removed in a future release. See https://fb.me/nolistview for more information'];
console.disableYellowBox = true // 关闭全部黄色警告
 
//应用号
const App_number = 1;

type Props = {};
export default class InputView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      title_text: '',
      title_size: 0,
      sheet_name:'',
      jsonNumber: 0,
      data: []
    };
    this.DynamicLoading = this.DynamicLoading.bind(this);
  }
  componentDidMount() {
    this._fetHeadline();
  }
  //网络请求-加载配置表信息
  _fetHeadline() {
    fetch(`http://225858ws28.51mypc.cn:35224/headline?App_Number=${App_number}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
            title_text: jsonData[0].title_text,
            title_size: jsonData[0].title_size,
            sheet_name: jsonData[0].sheet_name
          });
        return jsonData[0].sheet_name;
      })
      .then((sheetName) =>{
        this._fetLayout(sheetName);
      })
      .catch((error) => {
        alert(error);
      });
  }
  _fetLayout(sheetName) {
    fetch(`http://225858ws28.51mypc.cn:35224/layout?sheet_name=${sheetName}`, {
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
      const { ID, type, title, data } = this.state.data[i];
      switch (type) {
        case "label":
          result.push(<LabelTest key={ID} titleText={title} />);
          break;
        case "textInput":
          result.push(<TextInputTest key={ID} titleText={title} />);
          break;
        case "button":
          result.push(<ButtonTest key={ID} titleText={title} />);
          break;
        case "dropDown":
          result.push(<DropdownTest key={ID} titleText={title} net_api={data} />);
          break;
        case "photo":
          result.push(<PhotoTest key={ID} titleText={title} />);
          break;
      }
    }
    return result.sort((a, b) => a.key - b.key);
  }
  //测试组件渲染
  render() {
    return (
      <View style={WebTestStyles.container}>
        <Text style={WebTestStyles.headline}>{this.state.title_text}</Text>
        <View style={WebTestStyles.component}>{this.DynamicLoading()}</View>
      </View>
    );
  }
}
const WebTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 10
  },
  headline: {
    fontSize: 50,
    marginTop: 50,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    textAlignVertical:'center',
  },
  component: {
    marginTop: 5,
    marginLeft: 10
  }
});
