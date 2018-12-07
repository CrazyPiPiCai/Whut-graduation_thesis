/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import { Router, Scene, Tabs, Stack } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

import InfoIndexView from "./View/Info_index";
import InfoView from "./View/Info_main";
import InfoCompletionView from "./View/Info_completion";
import SelectView from "./View/Select_index";
import SheetView from "./View/Select_sheet";
import InputView from "./View/Input";

//注意！tabber点击后改变未实现
class TabIcon extends Component {
  render() {
    //selected属性？
    var color = this.props.selected ? "#00f240" : "#301c2a";

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center"
        }}
      >
        <Icon style={{ color: color }} name={this.props.iconName} size={18} />
        <Text style={{ color: color, fontSize: 12, marginTop: 10 }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar tabBarPosition="bottom">
          <Tabs
            key="tabbar"
            swipeEnabled
            wrap={false}
            showLabel={false}
            tabBarStyle={{ backgroundColor: "#eee" }}
          >
            <Scene
              key="info"
              iconName="comments"
              title="信息沟通"
              icon={TabIcon}
            >
              <Scene key="one" component={InfoIndexView} title="主页" />
              <Scene key="one_main" component={InfoView} title="质量反馈功能呈现" />
              <Scene key="one_second" component={InfoCompletionView} title="完工反馈功能呈现" />
            </Scene>

            <Scene
              key="select"
              iconName="search"
              title="呈现查询"
              icon={TabIcon}
            >
              <Scene key="two_main" component={SheetView} title="功能呈现" />
            </Scene>

            <Scene
              key="input"
              iconName="edit"
              title="输入设定"
              icon={TabIcon}
              component={InputView}
            />
          </Tabs>
        </Scene>
      </Router>
    );
  }
}
