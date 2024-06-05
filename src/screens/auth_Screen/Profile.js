import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from "../../component/DarkTheme";

const Profile_Screen = () => {
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Text style={[styles.text , {backgroundColor: isDarkMode ? '#ffffff' : '#0000000  E   '}]}>Profile Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Change text color as per your preference
  },
});

export default Profile_Screen;
