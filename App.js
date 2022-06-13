import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import WebView from "react-native-webview";
import Root from "./src/navigation";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <WebView source={{ uri: "https://mobile-winus.web.app/" }} /> */}
      <StatusBar style="auto" />
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
