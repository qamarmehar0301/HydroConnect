import React from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '../component/DarkTheme';
import Grocery_Card from '../component/Grocery_Card';
import { deliveryData } from '../global/data';
import Header from '../component/Header';

const CategoryProducts = ({ route, navigation }) => {
    const { Prd_Catagory } = route.params;
    const { isDarkMode } = useTheme();

    const lowerCaseCategory = Prd_Catagory.toLowerCase();
    const filteredProducts = deliveryData.filter(item => item.category.toLowerCase() === lowerCaseCategory);
    const count = filteredProducts.length;

    const cardPressed = (data) => {
        const prd_data = data;
        navigation.navigate('ProductDetials', { productData: prd_data })
    }

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View>
                    <Header title={Prd_Catagory} navigation={navigation} />
                </View>
                <View>
                    <Text style={[styles.heading, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>{count} Products are available for {Prd_Catagory}. </Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: '5%' }}>
                                <Grocery_Card
                                    Prd_Name={item.name}
                                    Prd_Image={item.image}
                                    Prd_Price={item.price}
                                    onPressGrocery_Card={() => { cardPressed(item) }}
                                />
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10
    },
});

export default CategoryProducts;
