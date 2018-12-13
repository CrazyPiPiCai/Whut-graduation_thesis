import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ImagePicker from "react-native-image-picker";

import global from "../others/global";

export default class PhotoTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      videoSource: null
    };
  }
  //选择图片
  selectPhotoTapped() {
    const options = {
      title: "选择图片",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: "选择照片",
      cameraType: "back",
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
        global.imagePath = source.uri;
      }
    });
  }
  render() {
    return (
      <View style={SelfStyles.container}>
        <Text style={SelfStyles.leftlabel}>{this.props.titleText}</Text>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[
              SelfStyles.avatar,
              SelfStyles.avatarContainer
            ]}
          >
            {this.state.avatarSource === null ? (
              <Text>选择照片</Text>
            ) : (
              <Image
                style={SelfStyles.avatar}
                source={this.state.avatarSource}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const SelfStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems:'center'
  },
  leftlabel: {
    marginLeft: 10,
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 ,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    //borderRadius: 50,
    width: 100,
    height: 100
  }
});
