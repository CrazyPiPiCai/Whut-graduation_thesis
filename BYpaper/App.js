/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Router, Scene, Tabs } from "react-native-router-flux";

import InfoView from "./View/Info";
import SelectView from "./View/Select";
import InputView from './View/Input';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar tabBarPosition="bottom">
          <Tabs
            key="tabbar"
            swipeEnabled
            wrap={false}
            // 是否显示标签栏文字
            showLabel={false}
            tabBarStyle={{ backgroundColor: "#eee" }}
            //tab选中的颜色
            activeBackgroundColor="white"
            //tab没选中的颜色
            inactiveBackgroundColor="red"
          >
            <Scene
              key="two"
              component={SelectView}
              title="呈现查询"
              icon={TabIcon}
            />

            <Scene
              key="two"
              component={InfoView}
              title="信息沟通"
              icon={TabIcon}
            />

            <Scene
              key="three"
              component={InputView}
              title="输入设定"
              icon={TabIcon}
            />
          </Tabs>
        </Scene>
      </Router>
    );
  }
}
