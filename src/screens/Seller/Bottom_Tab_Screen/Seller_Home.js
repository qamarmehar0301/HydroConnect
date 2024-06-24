import React, { useContext } from "react";
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTheme } from "../../../component/DarkTheme";
import Seller_Header from '../../../component/SellerComp/Seller_Header'
import { SignInContext } from "../../../navigaiton/Contexts/AuthContext";
import auth from '@react-native-firebase/auth'
import Seller_Swiper from "../../../component/SellerComp/Seller_Swiper";
import Home_Contact from "../../../component/Home_Contact";
import Sales_Record from "../../../component/SellerComp/Sale_Record";

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
            auth().signOut().then(console.log('Sign Out Successfully..!!'))
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
      <ScrollView>
        <View style={styles.swiper_container}>
          <Seller_Swiper />
        </View>

        <View>
          <Text style={styles.sales_Text}> My Sales </Text>
          <View style={{ alignItems: 'center' }}>
            <Sales_Record />
          </View>
        </View>
        <Home_Contact />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper_container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%',
  },
  sales_Text: {
    color: '#000',
    fontFamily: 'PT Sans',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: "10%",
  }
});

