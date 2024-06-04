import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigaiton/RootNavigation";

export default function App() {
  return (
    <View style={styles.header}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.theme}
      />
      <RootNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white'
  }
})