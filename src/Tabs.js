import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import barcoo from "./barco";
import came from "./came";
import gall from "./gall";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="사진" component={gall} />
      <Tab.Screen name="barcode" component={barcoo} />
      <Tab.Screen name="camera" component={came} />
    </Tab.Navigator>
  );
};

export default Tabs;
