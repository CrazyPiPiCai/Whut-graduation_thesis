import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

import global from "../others/global";

//注意！点击上一级下拉框产生下一级的改变未实现
export default class DropdownTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      data: []
    };
    this.selectOption = this.selectOption.bind(this);
  }
  componentDidMount() {
    fetch(
      `http://localhost:3000/select?sheet_name=${this.props.net_api}`,
      { method: "GET" }
    )
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
  selectOption() {
    const result = [];
    for (var i = 0; i < this.state.jsonNumber; i++) {
      const { dataSource } = this.state.data[i];
      result.push(`${dataSource}`);
    }
    return result;
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text style={SelfStyles.leftlabel}>{this.props.titleText}</Text>
        <ModalDropdown
          style={SelfStyles.rightDropDown}
          defaultValue={"请选择！"}
          options={this.selectOption()}
          onSelect={(index, value) => global.finalText[this.props.ID-1] = value}
        />
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
  rightDropDown: {
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 5
  }
});
