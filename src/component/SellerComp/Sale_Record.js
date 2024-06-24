import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'

export default function Sales_Record() {
    return (
        <View>
            <View style={styles.cardRow}>
                {/* Card1 */}
                <TouchableOpacity style={styles.cardContainer1} onPress={()=>{Alert.alert('Future Work..!!!')}}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/sale1.png')}
                        />
                    </View>
                    <Text style={styles.price} >$1k</Text>
                    <Text style={styles.total} >Total Sales</Text>
                    <Text style={styles.text} >+8% from yesterday</Text>
                </TouchableOpacity>

                {/* Card2 */}
                <TouchableOpacity style={styles.cardContainer2} onPress={()=>{Alert.alert('Future Work..!!!')}}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/sale2.png')}
                        />
                    </View>
                    <Text style={styles.price} >300</Text>
                    <Text style={styles.total} >Total Order</Text>
                    <Text style={styles.text} >+8% from yesterday</Text>
                </TouchableOpacity>
            </View>

            {/* Second Row */}
            <View style={styles.cardRow}>
                {/* Third Card */}
                <TouchableOpacity style={styles.cardContainer3} onPress={()=>{Alert.alert('Future Work..!!!')}}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/sale3.png')}
                        />
                    </View>
                    <Text style={styles.price} >5</Text>
                    <Text style={styles.total} >Product Sold</Text>
                    <Text style={styles.text} >+8% from yesterday</Text>
                </TouchableOpacity>

                {/* Fourth Card */}
                <TouchableOpacity style={styles.cardContainer4} onPress={()=>{Alert.alert('Future Work..!!!')}}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/sale4.png')}
                        />
                    </View>
                    <Text style={styles.price} >8</Text>
                    <Text style={styles.total} >New Customers</Text>
                    <Text style={styles.text} >+8% from yesterday</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cardRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    cardContainer1: {
        width: 150,
        height: 165,
        flexShrink: 0,
        borderRadius: 15,
        backgroundColor: '#FFE2E5',
        paddingLeft: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    cardContainer2: {
        width: 150,
        height: 165,
        flexShrink: 0,
        borderRadius: 15,
        backgroundColor: '#FFF4DE',
        paddingLeft: 15,
        margin: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    cardContainer3: {
        width: 150,
        height: 165,
        flexShrink: 0,
        borderRadius: 15,
        backgroundColor: '#DCFCE7',
        paddingLeft: 15,
        margin: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    cardContainer4: {
        width: 150,
        height: 165,
        flexShrink: 0,
        borderRadius: 15,
        backgroundColor: '#F3E8FF',
        paddingLeft: 15,
        margin: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    logoContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, // Adjust the spacing as needed
    },
    text: {
        flexShrink: 0,
        color: '#4079ED',

        fontFamily: 'PT Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 10,
    },
    price: {
        flexShrink: 0,
        color: '#151D48',

        fontFamily: 'PT Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 20,
    },
    total: {
        flexShrink: 0,
        color: '#425166',

        fontFamily: 'PT Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 10,
    },
})