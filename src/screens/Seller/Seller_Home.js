import React, { useContext } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useTheme } from "../../component/DarkTheme";
import Seller_Header from "../../component/SellerComp/Seller_Header";
import { Button } from "react-native-elements";
import { SignInContext } from "../../navigaiton/Contexts/AuthContext";

export default function Seller_Home({ navigation }) {
  const { isDarkMode } = useTheme();
  const { dispatchSignedIn } = useContext(SignInContext)

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log('User signout');
            dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: null } });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Seller_Header title="Hydro Connect" navigation={navigation} onLogoutPress={handleLogout} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...styles.text, color: isDarkMode ? '#ffffff' : '#000000' }}> Seller Home </Text>
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

