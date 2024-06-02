import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import Login from "./src/screens/auth_Screen/Login";
import Header from "./src/component/Header";

export default function App() {
  return (
    <View style={styles.header}>
      <StatusBar
      barStyle= 'light-content'
        backgroundColor= {colors.theme}
      />
      {/* <Header/> */}
      <Login/>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white'
  }
})