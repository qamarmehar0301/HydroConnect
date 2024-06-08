import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from "react-native";
import { colors } from "../global/styles";
import { useTheme } from "./DarkTheme";

export default function Home_Slider({OfferBtn, OfferName, OfferPer, OfferImg,onPressBtn}) {
    const {isDarkMode} = useTheme();
    const styles =  isDarkMode ? darkStyles : lightStyles 
    return (
        <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <View style={styles.slider_card}>
                <View style={styles.slider_data}>
                    <View >
                        <Text style={styles.text1}> {OfferName} </Text>
                    </View>
                    <View >
                        <Text style={styles.text2}>{OfferPer}% Off </Text>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.btn_text} onPress={ onPressBtn }>
                            <Text style={{ color: 'black', fontSize: 20, margin: '2%' }}> {OfferBtn} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '7%' }}>
                    <Image
                        style={styles.slider_Img}
                       // source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKnoUHXOemR8aJByC5qTrdOCO9i143tOdXcOGu1oNEA&s" }}
                       source={{ uri: OfferImg }}
                    />

                </View>
            </View>
        </View>

    )
}

const lightStyles = StyleSheet.create({
    slider_card: {
        height: 180, width: '100%',
        backgroundColor: colors.theme,
        borderRadius: 12,
        elevation: 4,
        flexDirection: 'row',
    },
    slider_data: {
        marginVertical: '5%',
        marginLeft: '7%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems:'flex-start'
    },
    slider_Img: {
        borderRadius: 100,
        height: 160,
        width: 160
    },
    text1: {
        color: 'white',
        fontSize: 22,
        alignItems: 'center',
        // paddingLeft: '4%',
        marginVertical: '3%'
    },
    text2: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold'
    },
    btn_text: {
        marginVertical: '6%',
        backgroundColor: 'transparent',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
    },

})

const darkStyles = StyleSheet.create({
    slider_card: {
        height: 180, width: '100%',
        backgroundColor: '#000',
        borderWidth: 1, 
        borderColor: 'white',
        borderRadius: 12,
        elevation: 4,
        flexDirection: 'row',
    },
    slider_data: {
        marginVertical: '5%',
        marginLeft: '7%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems:'flex-start'
    },
    slider_Img: {
        borderRadius: 100,
        height: 160,
        width: 160,
        borderWidth: 1,
        borderColor: 'black'
    },
    text1: {
        color: '#fff',
        fontSize: 22,
        alignItems: 'center',
        // paddingLeft: '4%',
        marginVertical: '3%'
    },
    text2: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold'
    },
    btn_text: {
        marginVertical: '6%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
    },

})