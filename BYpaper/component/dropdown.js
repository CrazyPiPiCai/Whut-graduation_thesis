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
      data: [],
      refresh: false
    };
  }
  componentDidMount() {
    global.dropDownID.push(this.props.ID);
    const First = Math.min.apply(null, global.dropDownID);
    if (this.props.ID == First) {
      this._fetchFirstDropdown();
    }
  }
  _selectOption() {
    if (this.props.ID == 1) {
      const result = [];
      for (var i = 0; i < this.state.jsonNumber; i++) {
        const { dataSource } = this.state.data[i];
        result.push(`${dataSource}`);
      }
      return result;
    } else {
      return global.secondDropDown;
    }
  }
  _fetchFirstDropdown() {
    fetch(`http://129.28.79.59:3000/select?sheet_name=${this.props.net_api}`, {
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
  _fetchSecondDropdown(filter) {
    fetch(
      `http://129.28.79.59:3000/secondDropdown?sheet_name=qualityFeedback_section&filter=${filter}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        const jsonNumber = jsonData.length;
        const data = jsonData;
        const result = [];
        for (var i = 0; i < jsonNumber; i++) {
          const { dataSource } = data[i];
          result.push(`${dataSource}`);
        }
        global.secondDropDown = result;
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            fontSize: this.props.title_size
          }}
        >
          {this.props.titleText} :
        </Text>
        <ModalDropdown
          style={SelfStyles.rightDropDown}
          textStyle={{ fontSize: 15 }}
          dropdownTextStyle={{ fontSize: 15 }}
          defaultValue={"请选择！"}
          options={this._selectOption()}
          onSelect={(index, value) => {
            if (this.props.identity == "图片查询") {
              global.select_photo[this.props.ID - 1] = value;
              if (this.props.ID == 1) {
                this._fetchSecondDropdown(value);
              }
            } else {
              global.Info_quality_text[this.props.ID - 1] = value;
              if (this.props.ID == 1) {
                this._fetchSecondDropdown(value);
              }
            }
          }}
          onDropdownWillShow={() => this.setState({ refresh: true })}
        />
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  rightDropDown: {
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 10
  }
});
