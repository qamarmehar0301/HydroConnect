import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image, Linking } from "react-native";
import { useTheme } from "./DarkTheme";

export default function Home_Contact() {

    const phoneNumber = '+923425288079';
    const message = 'Hydro Connect, How can I help you?';
    const sendWhatsAppMessage = () => {
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        Linking.openURL(url)
            .then(() => console.log('WhatsApp opened'))
            .catch((error) => console.error('Error opening WhatsApp', error));
    };

    const {isDarkMode} = useTheme();
    const styles =  isDarkMode ? darkStyles : lightStyles ; 
    return (
        <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <View style={styles.slider_card}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '7%' }}>
                    <Image
                        style={styles.slider_Img}
                        source={require('../assets/customer-service.png')}
                    />
                </View>
                <View style={styles.slider_data}>
                    <Text style={styles.cardTitle}>Help & Customer Support</Text>
                    <Text style={styles.cardDescription}>Register a complaint or get quick </Text>
                    <Text style={styles.cardDescription}>help on queries Related to</Text>
                    <Text style={styles.cardDescription}>HYDRO CONNECT</Text>
                    <TouchableOpacity style={styles.button} onPress={sendWhatsAppMessage}>
                        <Text style={styles.buttonText}>Get Help? </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const lightStyles = StyleSheet.create({
    slider_card: {
        height: 180, width: '90%',
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 4,
        flexDirection: 'row',
    },
    slider_data: {
        marginVertical: '1%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider_Img: {
        borderRadius: 100,
        height: 110,
        width: 110
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
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 20,
    },
    cardDescription: {
        fontSize: 11,
        fontWeight: '300',
        color: '#000',
        marginLeft: 20,
    },
    button: {
        width: 150,

        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#4BA26A',
        flexDirection: 'row',
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',

    }
})

const darkStyles = StyleSheet.create({
    slider_card: {
        height: 180, width: '90%',
        backgroundColor: 'black',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'white',
        elevation: 4,
        flexDirection: 'row',
    },
    slider_data: {
        marginVertical: '1%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider_Img: {
        borderRadius: 100,
        height: 110,
        width: 110
    },
    text1: {
        color: 'white',
        fontSize: 22,
        alignItems: 'center',
        // paddingLeft: '4%',
        marginVertical: '3%'
    },
    text2: {
        color: 'white',
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
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 20,
    },
    cardDescription: {
        fontSize: 11,
        fontWeight: '300',
        color: '#fff',
        marginLeft: 20,
    },
    button: {
        width: 150,

        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#4BA26A',
        flexDirection: 'row',
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',

    }
})