import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigaiton/RootNavigation";
import { ThemeProvider, useTheme } from "./src/component/DarkTheme";

const AppContent = () => {
  const { isDarkMode } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : colors.theme}
      />
      <RootNavigator />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
