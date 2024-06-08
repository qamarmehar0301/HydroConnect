import React from "react";
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { useTheme } from "../DarkTheme";
import { Icon } from "react-native-elements";

export default function Cart_Card({ item, onRemove }) {
    const { isDarkMode } = useTheme();

    return (
        <View style={{ backgroundColor: isDarkMode ? '#000000' : 'white' }}>
            <View style={styles.cart_container}>
                <View style={styles.cart_img_con}>
                    <Image
                        //source={{ uri: 'https://shorturl.at/sYEHa' }}
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.cart_det_con} >
                    <View style={{ marginTop: '10%', alignItems: 'center' }}>
                        <Text style={styles.cart_prd}>{item.name} </Text>
                    </View>
                    <View >
                        <Text style={styles.cart_tag}>{item.tagline}</Text>
                    </View>
                    <View style={{ marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                        <View>
                            <Text style={styles.cart_price}>Pkr: {item.price} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 100 }}>
                            <View>
                                <Icon
                                    name="plus-circle-outline"
                                    type="material-community"
                                    size={30}
                                    color='grey'
                                //onPress={()=>{onPressPlus}}
                                />
                            </View>
                            <View>
                                <Text style={{ color: 'black', fontSize: 20 }}>1</Text>
                            </View>
                            <View>
                                <Icon
                                    name="minus-circle-outline"
                                    type="material-community"
                                    size={30}
                                    color='grey'
                                // onPress={()=>{onPressMinus}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    cart_container: {
        height: '45%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    cart_img_con: {
        height: '95%',
        width: '25%',
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
        borderRadius: 30,
        alignItems: 'flex-start',
        backgroundColor: 'red'

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
    }
});



// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const Cart_Card = ({ item, onRemove }) => {
//     return (
//         <View style={styles.cardContainer}>
//             <Text style={styles.itemName}>{item.name}</Text>
//             <Text style={styles.itemPrice}>${item.price} * {item.quantity}</Text>
//             <TouchableOpacity onPress={onRemove}>
//                 <Text style={styles.removeButton}>Remove</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     cardContainer: {
//         padding: 10,
//         backgroundColor: '#fff',
//         marginBottom: 10,
//         borderRadius: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 5,
//     },
//     itemName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     itemPrice: {
//         fontSize: 14,
//         color: '#555',
//     },
//     removeButton: {
//         marginTop: 10,
//         color: 'red',
//     },
// });

// export default Cart_Card;