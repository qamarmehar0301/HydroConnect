import React, {useRef, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView, Image, Animated } from 'react-native';
import { useTheme } from "../component/DarkTheme";
import Header from "../component/Header";
import { colors } from "../global/styles";
import Cart_Card from "../component/cart/Cart_card";
import { removeFromCart, incrementInCart, decrementInCart } from "../component/cart/cart_Action";
import { Button, Icon } from "react-native-elements";

export default function Handle_Cart({ navigation }) {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const { isDarkMode } = useTheme();
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [slideAnim]);

    const handleRemoveItem = (id) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your cart?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', onPress: () => dispatch(removeFromCart(id)) },
            ],
            { cancelable: true }
        );
    };

    const calculateSubTotalPrice = () => {
        let subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        return subtotal
    };
    const calculateTotalPrice = () => {
        const deliveryCharges = 200.00;
        const subTotal = calculateSubTotalPrice()
        const total = subTotal + deliveryCharges
        return total
    }

    const handleBuyNow = () => {
        const totalAmount = calculateTotalPrice()
        navigation.navigate('Checkout_Screen', {totalAmount})
    };

    const handleContinueShopping = () => {
        navigation.navigate('Grocery Products');
    };

    const handleIncrement = (id) => {
        dispatch(incrementInCart(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementInCart(id));
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }]}>
            <Header title="My Cart" navigation={navigation} />
            <Animated.View style={[styles.slideContainer, { transform: [{ translateY: slideAnim }] }]}>
                <Text style={styles.slideText}>Delivery should be 200 on every order.  </Text>
            </Animated.View>
            {cartItems.length > 0 ? (
                <>
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            {
                                cartItems.map((currentItem, index) => {
                                    return (
                                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                                            <View style={styles.cart_container}>
                                                <View style={styles.cart_img_con}>
                                                    <Image style={styles.image} source={{ uri: currentItem.image }} />
                                                </View>
                                                <View style={[styles.cart_det_con,]}>
                                                    <View style={{ marginTop: '10%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '85%' }}>
                                                        <View>
                                                            <Text style={styles.cart_prd}>{currentItem.name} </Text>
                                                        </View>
                                                        <View>
                                                            <Icon
                                                                name="close-circle-outline"
                                                                size={24}
                                                                type="material-community"
                                                                iconStyle={{ color: 'grey' }}
                                                                onPress={() => { handleRemoveItem(currentItem.id) }}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View >
                                                        <Text style={styles.cart_tag}>{currentItem.tagline}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '40%', width: '90%', alignItems: 'center' }}>
                                                        <View>
                                                            <Text style={styles.cart_price}>Pkr: {currentItem.price} </Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 100 }}>
                                                            <View>
                                                                <Icon
                                                                    name="plus-circle-outline"
                                                                    type="material-community"
                                                                    size={24}
                                                                    color='grey'
                                                                    onPress={() => { handleIncrement(currentItem.id) }}
                                                                />
                                                            </View>
                                                            <View>
                                                                <Text style={{ color: 'black', fontSize: 20 }}>{currentItem.quantity}</Text>
                                                            </View>
                                                            <View>
                                                                <Icon
                                                                    name="minus-circle-outline"
                                                                    type="material-community"
                                                                    size={24}
                                                                    color='grey'
                                                                    onPress={() => { handleDecrement(currentItem.id) }}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                        <View style={{ backgroundColor: isDarkMode ? 'black' : 'rgba(52,52,52,0.3)', height: '28%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '10%', marginVertical: '5%' }}>
                                <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 23 }}> Sub Total </Text>
                                <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20 }}> Pkr: {calculateSubTotalPrice()} </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '10%', marginVertical: '5%' }}>
                                <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 23 }}> Total Price </Text>
                                <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20 }}> Pkr: {calculateTotalPrice()} </Text>
                            </View>
                            <TouchableOpacity style={[styles.buyNowbutton, {backgroundColor: isDarkMode ? '#000000': colors.theme}]} onPress={handleBuyNow}>
                                <Text style={styles.buynowbuttonText}> Checkout </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.cartEmpty}>
                    <Text style={[styles.emptyText, { color: isDarkMode ? 'white' : '#000000' }]}> Your Cart is Empty. </Text>
                    <View style={styles.cartContainer}>
                        <TouchableOpacity style={[styles.cartBtn, {backgroundColor: isDarkMode ? 'black' :  colors.theme}]} onPress={handleContinueShopping}>
                            <Text style={[styles.cartText, {}]}>Continue Shopping </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cart_container: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    cart_img_con: {
        height: '95%',
        width: '30%',
        marginLeft: '5%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
        borderRadius: 90
    },
    cart_det_con: {
        height: '95%',
        width: '60%',
        alignItems: 'flex-start',
    },
    cart_prd: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
    cart_tag: {
        color: 'rgba(52,52,52,0.3)',
        fontSize: 13
    },
    cart_price: {
        color: 'black',
        fontSize: 20,
    },
    buyNowbuttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        width: '100%',
    },
    buyNowbutton: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
                        borderWidth: 1,
        borderColor: 'white'
    },
    buynowbuttonText: {
        color: 'white',
        fontSize: 20
    },
    cartEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 16,
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        width: '100%',
    },
    cartBtn: {
        width: '90%',
        height: 45,
        borderRadius: 30,
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
    item_container: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    slideContainer: {
        height: 20,
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    slideText: {
        color: 'white'
    }
});
