import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from "../../component/Header";
import { colors } from "../../global/styles";

export default function S_Product_Details({ route, navigation }) {
    const { product } = route.params;

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View>
                    <Header title="Product Details" navigation={navigation} />
                </View>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.imageUrl }}
                        //source={{ uri: "https://shorturl.at/Aprqt" }}
                        style={styles.image} />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <Text style={[styles.title, { color:'black' }]}>{product.title}</Text>
                    <Text style={[styles.price, { color:'black' }]}>Rs: {product.price.toString()}</Text> 
                   
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={[styles.text, { color:'black' }]}>{product.tagLine} </Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={[styles.categoryTitle, { color:'black' }]}>Category: </Text>
                    <Text style={[styles.category, { color:colors.theme }]}>{product.category.toUpperCase()}</Text>
                </View> 
                <View style={styles.quantityContainer}>
                    <Text style={[styles.quantityTitle, { color: 'black' }]}>Available Stock: </Text>
                    <Text style={[styles.quantity, { color: colors.theme }]}>{product.quantity} </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.descriptionTitle, { color: 'black' }]}>Description: </Text>
                    <Text style={[styles.descriptionText, { color: 'black' }]}>{product.description}</Text>
                </View>
            </ScrollView>
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
        borderRadius: 15
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
});
