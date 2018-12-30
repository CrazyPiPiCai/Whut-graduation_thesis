import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Actions } from 'react-native-router-flux';

export default class InfoIndexView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh:false,
      tableHead: ['序号', '应用名','跳转'],
      data:[]
    }
  }

  componentDidMount() {
    fetch(`http://129.28.79.59:3000/select?sheet_name=info_index`, {
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

  //Alert警告
  /*
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
  */

  _jsonExtract() {
    if (this.state.refresh) {
      const result = [];
      for (var i = 0; i < this.state.jsonNumber; i++) {
        const {
          ID,
          title_text
        } = this.state.data[i];
        result.push([
          `${ID}`,
          `${title_text}`,
          '按钮'
        ]);
      }
      return result;
    } else {
      return [];
    }
  }

  _navigation(index) {
    const {
        sheet_name
      } = this.state.data[index];
    switch(index) {
      case 0:
      Actions.one_main({passData:`${sheet_name}`,identity:'质量反馈'});
      break;
      case 1:
      Actions.one_second({passData:`${sheet_name}`,identity:'完工反馈'});
    }
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._navigation(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>选择</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} flexArr={[1,2,1]}/>
          {
            this._jsonExtract().map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} style={cellIndex === 1 ? styles.colBig : styles.colSmall} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 15, backgroundColor: '#fff' },
  //headline: {fontSize:20,justifyContent:'center',textAlign: 'center'},
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 ,textAlign: 'center'},
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  colSmall: { flex: 1},
  colBig :{ flex: 2},
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 ,alignSelf:'center'},
  btnText: { textAlign: 'center', color: '#fff' }
});