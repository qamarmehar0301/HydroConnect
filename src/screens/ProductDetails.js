import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Header from "../component/Header";
import { useTheme } from "../component/DarkTheme";
import { colors } from "../global/styles";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { addToCart } from "../component/cart/cart_Action";

export default function Product_Details({ route, navigation }) {
    const { productData } = route.params;
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();
    const toast = useToast();


    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        toast.show('Product added to cart successfully!', {
            type: 'success',
            placement: 'bottom',
            duration: 1500,
            style: { ...styles.toastContainer, backgroundColor: isDarkMode ? '#ffffff' : '#000000' },
            textStyle: { color: isDarkMode ? '#000000' : '#ffffff' },
        });

        // navigation.navigate('Handle_Cart');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
            <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
                <View>
                    <Header title="Product Details" navigation={navigation} />
                </View>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image
                        source={{ uri: productData.imageUrl }}
                        //source={{ uri: "https://shorturl.at/Aprqt" }}
                        style={styles.image} />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>{productData.title}</Text>
                    <Text style={[styles.price, { color: isDarkMode ? 'white' : 'black' }]}>Rs: {productData.price.toString()}</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>{productData.tagLine} </Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={[styles.categoryTitle, { color: isDarkMode ? 'white' : 'black' }]}>Category: </Text>
                    <Text style={[styles.category, { color: isDarkMode ? 'white' : colors.theme }]}>{productData.category.toUpperCase()}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <Text style={[styles.quantityTitle, { color: isDarkMode ? 'white' : 'black' }]}>Available Stock: </Text>
                    <Text style={[styles.quantity, { color: isDarkMode ? 'white' : colors.theme }]}>{productData.quantity} </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.descriptionTitle, { color: isDarkMode ? 'white' : 'black' }]}>Description: </Text>
                    <Text style={[styles.descriptionText, { color: isDarkMode ? 'white' : 'black' }]}>{productData.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.addbuttonContainer}>
                <TouchableOpacity style={[styles.addbutton, { backgroundColor: isDarkMode ? '#ffffff' : colors.theme }]} onPress={() => handleAddToCart(productData)}>
                    <Text style={[styles.buttonText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 17,
        width: '25%',
    },
    text: {
        marginVertical: '1%',
        fontSize: 15,
        letterSpacing: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 16,
        fontWeight: '700',
        paddingLeft: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    quantityTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '700',
        paddingLeft: 5,
    },
    descriptionContainer: {
        marginHorizontal: 20,
        marginVertical: 5,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: 5,
    },
    addbuttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    addbutton: {
        width: '90%',
        height: 45,
        flexShrink: 0,
        borderRadius: 28.5,
        shadowColor: 'rgba(254, 114, 76, 0.25)',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 30,
        shadowOpacity: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Alatsi',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 20,
    },
    toastContainer: {
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 70,
        width: '100%'
    },
});
