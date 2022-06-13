import React from "react";
import Tabs from "./Tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Nav = createStackNavigator();

const Root = () => (
  <Nav.Navigator
    initialRouteName="갤러리"
    screenOptions={{
      headerShown: false,
      presentation: "modal",
    }}
  >
    <Nav.Screen name="Tabs" component={Tabs} />
  </Nav.Navigator>
);

export default Root;
