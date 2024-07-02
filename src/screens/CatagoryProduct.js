import React,{useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '../component/DarkTheme';
import Grocery_Card from '../component/Grocery_Card';
import { deliveryData } from '../global/data';
import Header from '../component/Header';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { addToCart } from '../component/cart/cart_Action';
import firestore from '@react-native-firebase/firestore';

const CategoryProducts = ({ route, navigation }) => {
    const { Prd_Catagory } = route.params;
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();
    const toast = useToast();
    const [products, setProducts] = useState([]);

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
    
    const cat = Prd_Catagory.toLowerCase().trim()
    const filteredProducts = products.filter(item => item.category.toLowerCase() === cat);

    const cardPressed = (data) => {
        const prd_data = data;
        navigation.navigate('ProductDetials', { productData: prd_data })
    }
    const cartBtnPressed = (product) => {
        dispatch(addToCart(product));

        toast.show('Product added to cart successfully!', {
            type: 'success',
            placement: 'bottom',
            duration: 300,
            style: { ...styles.toastContainer, backgroundColor: isDarkMode ? '#ffffff' : '#000000' },
            textStyle: { color: isDarkMode ? '#000000' : '#ffffff' },
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}>
            <ScrollView stickyHeaderIndices={[0]}>
                <View>
                    <Header title={Prd_Catagory} navigation={navigation} />
                </View>
                <View>
                    <Text style={[styles.heading, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>{filteredProducts.length} Products are available for {Prd_Catagory}. </Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: '5%' }}>
                                <Grocery_Card
                                    Prd_Name={item.title}
                                    Prd_Image={item.imageUrl}
                                    Prd_Price={item.price}
                                    onPressGrocery_Card={() => { cardPressed(item) }}
                                    onPressCartBtn={() => { cartBtnPressed(item) }}
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
    toastContainer: {
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 70,
        width: '100%'
    },
});

export default CategoryProducts;
