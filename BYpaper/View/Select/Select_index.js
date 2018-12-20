import React, { Component } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class SelectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      data: []
    };
  }

  _renderItem = item => {
    return (
      <TouchableOpacity style={styles.itemList}>
        <Image
              style={styles.itemImage}
              source={{ uri: `${item.item.photo}`, cache: "force-cache" }}
            />
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>
              {item.item.ship}的{item.item.section}
          </Text>
          <View>
            <Text style={{ marginLeft: 5, marginTop: 5 }}>
              拍摄时间：{item.item.time}
            </Text>
            <Text style={{ marginLeft: 5, marginTop: 5 }}>
              操作人员：{item.item.people}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _fetchData(quest) {
    fetch(`http://129.28.79.59:3000/search?quest=${quest}`, {
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

  //行间分割线
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: "#7b7b7b" }} />;
  };
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor={"transparent"}
          translucent={false}
          barStyle={"light-content"}
        />
        <View style={styles.searchBox}>
          <Image
            source={require("../../image/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.inputText}
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={"transparent"} //下划线颜色设置为透明
            placeholderTextColor={"#aaa"} //设置占位符颜色
            placeholder={"搜索质量反馈数据库"}
            onChangeText={text => this._fetchData(text)}
          />
        </View>
        <View ItemSeparatorComponent={this._separator} />
        <View style={styles.trailList}>
          <FlatList
            ref={flatList => (this._flatList = flatList)}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => `${index}`}
            data={this.state.data}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    paddingTop: 27,
    paddingBottom: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cdcdcd"
  },
  searchBox: {
    flex: 1,
    minHeight: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: "row",
    backgroundColor: "#E6E7E8",
    borderRadius: 5
  },
  searchIcon: {
    alignSelf: "center",
    marginLeft: 7,
    marginRight: 7,
    width: 18,
    height: 18
  },
  inputText: {
    alignSelf: "center",
    flex: 1,
    height: 38,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    lineHeight: 20,
    textAlignVertical: "center",
    textDecorationLine: "none"
  },
  trailList: {
    flex: 20,
    width: 400,
    height: 100,
    marginLeft: 5,
    marginRight: 5
  },
  itemList: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 20,
    paddingBottom: 5,
    paddingTop: 5
  },
  itemContainer: {
    flex: 4.1,
    marginLeft: 5,
    justifyContent: "center"
  },
  itemTitle: {
    fontSize: 15,
    color: "#42a5cb",
    fontWeight: "700",
    marginLeft: 10,
    marginTop: 5
  },
  itemImage: {
    height: 65,
    width: 65,
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
    marginTop: 5
  }
});
