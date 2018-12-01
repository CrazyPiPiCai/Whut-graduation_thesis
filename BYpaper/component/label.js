import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class LabelTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelText: ""
    };
    this._getmyDate = this._getmyDate.bind(this);
    this._dataSource = this._dataSource.bind(this);
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
  //标签内容填充
  _dataSource(para) {
    switch (para) {
      case "时间":
        return this._getmyDate();
        break;
      case "人员":
        return '当前操作人员';
        break;
    }
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text style={SelfStyles.leftlabel}>{this.props.titleText}</Text>
        <Text style={SelfStyles.rightlabel}>{this._dataSource(this.props.titleText)}</Text>
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
  rightlabel: {
    marginLeft:5,
    marginTop:5
  }
});
