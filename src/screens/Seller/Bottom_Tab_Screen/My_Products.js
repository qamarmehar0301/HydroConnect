import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';

import Header from "../../../component/Header";
import { colors } from "../../../global/styles";
import { Icon } from "react-native-elements";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function My_Product_Screen({ navigation, route }) {

  const [products, setProducts] = useState([]);

  const sellerID = auth().currentUser.uid;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firestore()
          .collection("All_Products")
          .where("sellerId", "==", sellerID)
          .get();

        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    return () => {}; 
  }, [products]);
  
  const handleAddProduct = () => {
    navigation.navigate('Add_Product');
  };

  const handleViewProduct = (product) => {
    navigation.navigate('S_Product_Details', { product });
  };

  const handleEditProduct = (product) => {
    navigation.navigate('Edit_Product_Screen', { product });
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert('Delete', 'Do you Want to Delete the', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: async () => {
          try {
            await firestore().collection("All_Products").doc(productId).delete();
            setProducts(products.filter(product => product.id !== productId));
            
          } catch (error) {
            console.error("Error deleting product:", error);
          }
        }
      }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor:'white' }]}>
      <Header title="My Products" navigation={navigation} />

      <ScrollView style={{ flex: 1 }}>
        {products.map((product) => (
          <View key={product.id} style={styles.cardContainer}>
            <View style={{ width: '35%', height: '100%', alignItems: "center", justifyContent: 'center' }}>
              <Image style={styles.image} source={{ uri: product.imageUrl }} />
            </View>
            <View style={{ width: '65%', height: '100%', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: '80%', height: '100%' }}>
                <Text style={{ color: '#000', fontSize: 20 }}>{product.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'grey', fontSize: 16 }}>Price: </Text>
                  <Text style={{ color: '#32cd32' }}>{product.price} </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'grey', fontSize: 16 }}>Quantity: </Text>
                  <Text style={{ color: '#32cd32' }}>{product.quantity} </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'grey', fontSize: 16 }}>Category: </Text>
                  <Text style={{ color: '#32cd32' }}>{product.category} </Text>
                </View>
                <Text style={{ color: 'black', fontSize: 14 }}>{product.tagLine}</Text>
              </View>
              <View style={{ width: '20%', height: '100%', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Icon
                  name="eye"
                  type="material-community"
                  size={30}
                  color='grey'
                  onPress={() => handleViewProduct(product)}
                />
                <Icon
                  name="pencil"
                  type="material-community"
                  size={25}
                  color='grey'
                  onPress={() => handleEditProduct(product)}
                  style={styles.button}
                />
                <Icon
                  name="delete"
                  type="material-community"
                  size={25}
                  color='grey'
                  onPress={() => handleDeleteProduct(product.id)}
                  style={styles.button}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.cartBtn, { backgroundColor: colors.theme }]} onPress={handleAddProduct}>
        <Text style={styles.cartText}> Add new Product..! </Text>
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
  },
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
