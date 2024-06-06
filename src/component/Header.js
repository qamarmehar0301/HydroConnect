import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { colors, parameter } from "../global/styles";
import { Icon } from "react-native-elements";
import { useTheme } from "./DarkTheme";

export default function Header({ title, navigation }) {

    const {isDarkMode}= useTheme();
    return (
        <View style={[styles.header,{backgroundColor: isDarkMode ? '#000000' : colors.theme,}]}>
            <TouchableOpacity>
                <Icon
                    type="material-community"
                    name = 'arrow-left'
                    size={28}
                    color= 'white'
                    onPress={() => navigation.goBack()}
                />
            </TouchableOpacity>
            <Text style={styles.header_text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        height: parameter.header_height,
    },
    header_text: {
        color: parameter.header_text,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: '5%',
    },
});
