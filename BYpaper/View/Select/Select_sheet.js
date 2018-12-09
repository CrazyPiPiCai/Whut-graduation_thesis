import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

export default class SheetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "序号",
        "使用部门",
        "设备名称",
        "规格型号",
        "生产厂家",
        "计量单位",
        "数量",
        "单价",
        "使用状况",
        "购置日期",
        "原值",
        "净值",
        "所在地",
        "备注"
      ],
      refresh: false,
      jsonNumber: 0,
      data: []
    };
  }
  componentDidMount() {
    fetch(`http://225858ws28.51mypc.cn:21337/select?sheet_name=${this.props.passData}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
          refresh: true,
          jsonNumber: jsonData.length,
          data: jsonData
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
  _jsonExtract() {
    if (this.state.refresh) {
      const result = [];
      for (var i = 0; i < this.state.jsonNumber; i++) {
        const {
          ID,
          使用部门,
          设备名称,
          规格型号,
          生产厂家,
          计量单位,
          数量,
          单价,
          使用状况,
          购置日期,
          原值,
          净值,
          所在地,
          备注
        } = this.state.data[i];
        result.push([
          `${ID - 1}`,
          `${使用部门}`,
          `${设备名称}`,
          `${规格型号}`,
          `${生产厂家}`,
          `${计量单位}`,
          `${数量}`,
          `${单价}`,
          `${使用状况}`,
          `${购置日期}`,
          `${原值}`,
          `${净值}`,
          `${所在地}`,
          `${备注}`
        ]);
      }
      return result;
    } else {
      return [];
    }
  }
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
                widthArr={[
                  50,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100,
                  100
                ]}
              />
            </Table>
            <ScrollView>
              <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                <Rows
                  widthArr={[
                    50,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100,
                    100
                  ]}
                  data={this._jsonExtract()}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { textAlign: "center", fontWeight: "100" }
});
