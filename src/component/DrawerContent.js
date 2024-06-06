import React from 'react';
import { View, Text, Alert, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Icon } from 'react-native-elements';
import { colors } from '../global/styles';
import { useTheme } from './DarkTheme';

export default function DrawerContent(props, { navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const styles = isDarkMode ? darkStyles : lightStyles;
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.dataContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            size={95}
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IQRp11uZmQjD67o_OcOzjxjAzmGRHNoT7w&s" }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: isDarkMode ? 'grey' : 'white', fontSize: 18 }}>Muhammad Qamar</Text>
                            <Text style={{ color: isDarkMode ? 'grey' : 'white', fontSize: 12 }}> mqamar@hydroconnect.com </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", paddingBottom: 5 }}>
                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>1</Text>
                                <Text style={{ color: isDarkMode ? 'grey' : 'white', fontSize: 14 }}>My Favorites </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>0</Text>
                                <Text style={{ color: isDarkMode ? 'grey' : 'white', fontSize: 14 }}>My Cart </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem
                    labelStyle={{ color: colors.grey3 }}
                    label="Payment"
                    icon={({ focussed, color, size }) => (
                        <Icon
                            type="material-community"
                            name="credit-card-outline"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Promotions"
                    labelStyle={{ color: colors.grey3 }}
                    icon={({ color, size, focussed }) => (
                        <Icon
                            type="material-community"
                            name="tag-heart"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Settings"
                    labelStyle={{ color: colors.grey3 }}
                    icon={({ color, size, focussed }) => (
                        <Icon
                            type="material-community"
                            name="cog-outline"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Help"
                    labelStyle={{ color: colors.grey3 }}
                    icon={({ focussed, color, size }) => (
                        <Icon
                            type="material-community"
                            name="lifebuoy"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <View style={{ borderTopWidth: 1, borderTopColor: '#9F9F9F' }}>
                    <Text style={styles.preferences}>Preferences</Text>
                    <View style={styles.switchText}>
                        <Text style={styles.darkthemeText}>Dark Theme</Text>

                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={styles.whiteText}
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                        />
                    </View>
                </View>

                <TouchableOpacity style={{ marginTop: '30%', marginBottom: 15 }} >
                    <DrawerItem
                        onPress={() => { Alert.alert('SignIn') }}
                        label='Log Out'
                        labelStyle={{ color: colors.grey3 }}
                        icon={({ color, size, focussed }) => (
                            <Icon
                                type="material-community"
                                name="logout-variant"
                                size={size}
                                color={focussed ? '#7cc' : 'grey'}
                            />
                        )}
                    />
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    );
}

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        backgroundColor: colors.theme,
        paddingTop: '5%',
        marginTop: -5,
    },
    text: {
        color: '#000000',
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
    },
    avatar: {
        borderWidth: 4,
        borderColor: 'white',
    },
    preferences: {
        fontSize: 16,
        color: colors.grey3,
        paddingTop: 10,
        paddingLeft: 20,
    },
    switchText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darkthemeText: {
        fontSize: 16,
        color: colors.grey3,
        paddingTop: 10,
        paddingLeft: 0,
        fontWeight: "bold"
    },
    whiteText: {
        color: '#FFFFFF'
    },
    darkText: {
        color: '#000000'
    }
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        backgroundColor: '#000000',
        paddingTop: '5%',
        marginTop: -5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    text: {
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#000000',
    },
    avatar: {
        borderWidth: 4,
        borderColor: 'white',
    },
    preferences: {
        fontSize: 16,
        color: colors.grey3,
        paddingTop: 10,
        paddingLeft: 20,
    },
    switchText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darkthemeText: {
        fontSize: 16,
        color: colors.grey3,
        paddingTop: 10,
        paddingLeft: 0,
        fontWeight: "bold"
    },
    whiteText: {
        color: '#FFFFFF'
    },
    darkText: {
        color: '#000000'
    }
});
