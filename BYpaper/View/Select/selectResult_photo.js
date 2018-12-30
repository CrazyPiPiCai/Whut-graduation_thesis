import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

import global from "../../others/global";

export default class SelectPhotoResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonNumber: 0,
      photoPath: [],
      refresh: false
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(
      `http://129.28.79.59:3000/searchPhoto?ship=${
        global.select_photo[0] == undefined ? "" : global.select_photo[0]
      }&section=${
        global.select_photo[1] == undefined ? "" : global.select_photo[1]
      }&time=${
        global.select_photo[2] == undefined ? "" : global.select_photo[2]
      }`,
      {
        method: "GET"
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        const jsonNumber = jsonData.length;
        const data = jsonData;
        const result = [];
        for (var i = 0; i < jsonNumber; i++) {
          const { photo } = data[i];
          result.push(`${photo}`);
        }
        this.setState({
          refresh: true,
          jsonNumber: jsonData.length,
          photoPath: result
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  _imageLoading() {
    const result = [];
    console.log(global.select_photo);
    if (this.state.refresh) {
      for (var i = 0; i < this.state.jsonNumber; i++) {
        result.push(
          <Image
            key={i}
            source={{
              uri: `${this.state.photoPath[i]}`,
              cache: "force-cache"
            }}
            style={styles.image}
          />
        );
      }
      return result;
    } else {
      return result;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.box}>{this._imageLoading()}</View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cdcdcd"
  },
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 170,
    height: 220
  }
});
