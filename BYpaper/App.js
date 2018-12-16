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

import InfoIndexView from "./View/Info/Info_index";
import InfoView from "./View/Info/Info_main";
import InfoCompletionView from "./View/Info/Info_completion";
import SelectView from "./View/Select/Select_index";
import InputView from "./View/Input/Input";

class TabIcon extends Component {
  render() {
    //selected属性？
    //this.props.selected
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
        <Icon name={this.props.iconName} size={18} />
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
            showLabel={true}
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
              key="input"
              iconName="edit"
              title="输入设定"
              icon={TabIcon}
              component={InputView}
            />

            <Scene
              key="select"
              iconName="search"
              title="呈现查询"
              icon={TabIcon}
              component={SelectView}
            />
          </Tabs>
        </Scene>
      </Router>
    );
  }
}
