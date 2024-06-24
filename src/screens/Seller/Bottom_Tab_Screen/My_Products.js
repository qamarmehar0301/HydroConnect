import React from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme } from "../../../component/DarkTheme";
import Header from "../../../component/Header";
import { colors } from "../../../global/styles";
import { Icon } from "react-native-elements";

export default function My_Product_Screen({ navigation, route }) {
  const data = route.params;
  const productData = {
    image: 'https://i.pinimg.com/736x/e9/57/eb/e957ebe67e74cf98b59a558fa1f73263.jpg',
    name: 'Mangoes',
    price: '500rs',
    tagline: 'This is the Product Tagline',
    category: 'Fruits',
    stock: '50',
    description: 'This sis tte product description.'
  }
  const { isDarkMode } = useTheme();

  const handle_Prd_Btn = () => {
    navigation.navigate('Add_Product')
  }
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Header title="My Products" navigation={navigation} />

      <ScrollView style={{ flex: 1 }} >

        <View style={styles.cardContainer}>

          <View style={{ width: '35%', height: '100%', alignItems: "center", justifyContent: 'center' }}>
            <Image style={styles.image} source={{ uri: 'https://i.pinimg.com/736x/e9/57/eb/e957ebe67e74cf98b59a558fa1f73263.jpg' }} />
          </View>

          <View style={{ width: '65%', height: '100%', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: '80%', height: '100%' }}>
              <Text style={{ color: '#000', fontSize: 20 }}>Mangoes</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'grey', fontSize: 16 }}>Price: </Text>
                <Text style={{ color: '#32cd32' }}>500rs </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'grey', fontSize: 16 }}>Quantity: </Text>
                <Text style={{ color: '#32cd32' }}>500 </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'grey', fontSize: 16 }}>Category: </Text>
                <Text style={{ color: '#32cd32' }}>Fruits </Text>
              </View>
              <Text style={{ color: 'black', fontSize: 14 }}>This is the Products tagline. </Text>
            </View>
            <View style={{ width: '20%', height: '100%', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Icon
                name="eye"
                type="material-community"
                size={30}
                color='grey'
                onPress={() => { navigation.navigate('S_Product_Details',{productData})}}
              />
              <Icon
                name="pencil"
                type="material-community"
                size={25}
                color='grey'
                onPress={() => { navigation.navigate('Edit_Product_Screen',{productData})}}
                style={styles.button}
              />
              <Icon
                name="delete"
                type="material-community"
                size={25}
                color='grey'
                onPress={() => { Alert.alert('Delete') }}
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.cartBtn, { backgroundColor: colors.theme }]} onPress={handle_Prd_Btn}>
        <Text style={[styles.cartText, {}]}> Add new Product..! </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    width: '100%',
  },
  cartBtn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  cartText: {
    fontSize: 20,
    letterSpacing: 1,
    color: 'white'
  },
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: '3%',
    width: '95%',
    height: 150,
    marginHorizontal: '3%'
  }
  ,
  image: {
    width: '90%',
    height: '80%',
    borderRadius: 100,
    margin: '3%',
    borderWidth: 1
  },
  button: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3cb371",
    color: 'FFF',
    marginBottom: 10,
    borderRadius: 5,
  }
});

