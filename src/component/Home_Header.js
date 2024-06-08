import React from "react";
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { colors, parameter } from "../global/styles";
import { Icon, withBadge } from "react-native-elements";
import { useTheme } from "./DarkTheme";

export default function Home_Header({ navigation, cartIconPress }) {

    const { isDarkMode } = useTheme();
    const styles = isDarkMode ? darkStyles : lightStyles
    return (

        <View style={styles.header}>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '3.5%' }}>
                <Icon
                    type="material-community"
                    name="menu"
                    color='white'
                    size={32}
                    onPress={() => {
                        navigation.toggleDrawer()
                    }}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.header_Text}> Hydro Connect </Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: '3.5%' }}>
                <Icon
                    type="material-community"
                    name="cart"
                    color='white'
                    size={32}
                    onPress={cartIconPress}
                />
            </View>
        </View>

    )
}

const lightStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: colors.theme,
        height: parameter.header_height,
        justifyContent: 'space-between'
    },
    header_Text: {
        fontSize: 27,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "Cinzel Black"
    }
})

const darkStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#000',
        height: parameter.header_height,
        justifyContent: 'space-between',
    },
    header_Text: {
        fontSize: 27,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "Cinzel Black"
    }
})