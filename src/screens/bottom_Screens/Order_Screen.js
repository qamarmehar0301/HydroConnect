import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from "../../component/DarkTheme";
import Header from "../../component/Header";

export default function Order_Screen({ navigation }) {
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Header title="My Order" navigation={navigation} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...styles.text, color: isDarkMode ? '#ffffff' : '#000000' }}>Order Now</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

