import React from "react";
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { useTheme } from "../../component/DarkTheme";
import Header from "../../component/Header";
import Grocery_Card from "../../component/Grocery_Card";
import { ScrollView } from "react-native-gesture-handler";
import { deliveryData } from "../../global/data";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { addToCart } from "../../component/cart/cart_Action";

export default function Grocery_Products({ navigation }) {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const categories = {
    vegetables: deliveryData.filter(item => item.category === 'vegetables'),
    fruits: deliveryData.filter(item => item.category === 'fruits'),
    dairy: deliveryData.filter(item => item.category === 'dairy'),
    meat: deliveryData.filter(item => item.category === 'meat'),
    seafood: deliveryData.filter(item => item.category === 'seafood'),
  };

  const cardPressed = (data) => {
    const prd_data = data;
    navigation.navigate('ProductDetials', { productData: prd_data })
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

        {Object.entries(categories).map(([category, items]) => (
          items.length > 0 && (
            <View key={category}>
              <Text style={{ ...styles.text, color: isDarkMode ? '#ffffff' : '#000000' }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              <FlatList
                data={items}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Grocery_Card
                    Prd_Name={item.name}
                    Prd_Image={item.image}
                    Prd_Price={item.price}
                    onPressGrocery_Card={() => { cardPressed(item) }}
                    onPressCartBtn={() => { cartBtnPressed(item) }}
                  />
                )}
                contentContainerStyle={styles.flatListContainer}
              />
            </View>
          )
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
