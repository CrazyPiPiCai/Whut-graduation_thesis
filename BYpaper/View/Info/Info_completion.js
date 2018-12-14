import React, { Component } from "react";
import { StyleSheet, View, TextInput, Alert, Button } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import CheckBox from "react-native-check-box";

import ButtonTest from "../../component/button"; 
import global from "../../others/global";

export default class InfoCompletionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeadData: ["序号", "项目内容", "完成情况"],
      tableData: [],
      tableRefresh: false,
      tableCheck: [],
      tableNumber: 0
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/select?sheet_name=${this.props.passData}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
          tableRefresh: true,
          tableNumber: jsonData.length,
          tableData: jsonData
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
  //提取表内容并赋值
  _tableDataExtract() {
    if (this.state.tableRefresh) {
      const result = [];
      for (var i = 0; i < this.state.tableNumber; i++) {
        const { ID, content, evaluate } = this.state.tableData[i];
        result.push([`${ID}`, `${content}`, `${evaluate}`]);
      }
      return result;
    } else {
      return [];
    }
  }
  render() {
    const state = this.state;
    const element1 = (data, index) => (
      <TextInput
        style={{
          borderRadius: 4,
          margin: 5,
          backgroundColor: "#fff"
        }}
        underlineColorAndroid="transparent"
        onChangeText={text => {
          global.Info_completion_text[index] = text;
        }}
      />
    );

    const element2 = (data, index) => (
      <CheckBox
        style={{ flex: 1, margin: 5 }}
        onClick={() => {
          this.setState({
            isChecked: !this.state.isChecked
          });
        }}
        isChecked={this.state.isChecked}
      />
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={state.tableHeadData}
            style={styles.head}
            textStyle={styles.text}
            flexArr={[1, 3, 1]}
          />
          {this._tableDataExtract().map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={
                    cellIndex === 2 ? element1(cellData, index) : cellData
                    /*
                    (cellData, cellIndex) => {
                    if(cellIndex === 2) {
                      return cellData
                      //element1(cellData, cellIndex);
                    } else {
                      return cellData
                    }
                  }
                    switch (cellIndex) {
                      case 2:
                        element1(cellData, cellIndex);
                        break;
                      default:
                        return cellData;
                        break;
                    }
                    */
                  }
                  style={cellIndex === 1 ? styles.colBig : styles.colSmall}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
        <ButtonTest titleText={'提交'} identity={this.props.identity}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  //headline: {fontSize:20,justifyContent:'center',textAlign: 'center'},
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "#c8e1ff" },
  colSmall: { flex: 1 },
  colBig: { flex: 3 },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
    alignSelf: "center"
  },
  btnText: { textAlign: "center", color: "#fff" }
});
