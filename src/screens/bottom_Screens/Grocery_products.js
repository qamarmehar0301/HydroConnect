import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { useTheme } from "../../component/DarkTheme";
import Header from "../../component/Header";
import Grocery_Card from "../../component/Grocery_Card";
import { ScrollView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { addToCart } from "../../component/cart/cart_Action";
import firestore from '@react-native-firebase/firestore'; 

export default function Grocery_Products({ navigation }) {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();
  const [products, setProducts] = useState([]);

  const categories = {
    vegetables: products.filter(item => item.category === 'vegetables'),
    fruits: products.filter(item => item.category === 'fruits'),
    dairy: products.filter(item => item.category === 'dairy'),
    meat: products.filter(item => item.category === 'meat'),
    seafood: products.filter(item => item.category === 'seafood'),
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await firestore().collection('All_Products').get();
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        Alert.alert('Error', 'Failed to fetch products from Firestore.');
      }
    };

    fetchProducts();
  }, []);

  const cardPressed = (data) => {
    navigation.navigate('ProductDetials', { productData: data });
  }

  const cartBtnPressed = (product) => {
    dispatch(addToCart(product));

    toast.show('Product added to cart successfully!', {
      type: 'success',
      placement: 'bottom',
      duration: 1000,
      style: { ...styles.toastContainer, backgroundColor: isDarkMode ? '#ffffff' : '#000000' },
      textStyle: { color: isDarkMode ? '#000000' : '#ffffff'},
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <ScrollView stickyHeaderIndices={[0]} style={{ marginBottom: 10 }}>
        <View>
          <Header title="Grocery" navigation={navigation} />
        </View>

        {Object.keys(categories).map(category => (
          <View key={category}>
            <Text style={{ ...styles.text, color: isDarkMode ? '#ffffff' : '#000000' }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <FlatList
              data={products.filter(item => item.category === category)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <Grocery_Card
                  Prd_Name={item.title}
                  Prd_Image={item.imageUrl}
                  Prd_Price={item.price}
                  onPressGrocery_Card={() => { cardPressed(item) }}
                  onPressCartBtn={() => { cartBtnPressed(item) }}
                />
              )}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: '5%',
    marginLeft: '2%',
  },
  flatListContainer: {
    paddingLeft: '2%',
  },
  toastContainer: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 70,
    width: '100%'
  },
});
