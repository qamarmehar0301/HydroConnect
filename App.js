import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import Login from "./src/screens/auth_Screen/Login";
import Header from "./src/component/Header";
import Welcome_Screen from "./src/screens/Welcome";
import SignUp from "./src/screens/auth_Screen/SignUp";
import TermsAndConditionsPage from "./src/screens/auth_Screen/TermCond";
import Privacy from "./src/screens/auth_Screen/Privacy"
import StackNavigator from "./src/navigaiton/stackNavigaiton";
import Home_Screen from "./src/screens/bottom_navigaitons/Home_Screen";

export default function App() {
  return (
    <View style={styles.header}>    
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.theme}
      />
      {/* <Header/> */}
      {/* <Login/> */}
      {/* <Welcome_Screen/> */}
      {/* <SignUp/> */}
      {/* <TermsAndConditionsPage/> */}
      {/* <Privacy/> */}
      {/* <StackNavigator /> */}
      <Home_Screen/>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white'
  }
})