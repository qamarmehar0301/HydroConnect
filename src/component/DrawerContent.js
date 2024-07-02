import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Icon } from 'react-native-elements';
import { colors } from '../global/styles';
import { useTheme } from './DarkTheme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SignInContext } from '../navigaiton/Contexts/AuthContext';

export default function DrawerContent(props) {
    const { isDarkMode, toggleTheme } = useTheme();
    const styles = isDarkMode ? darkStyles : lightStyles;
    const [data, setData] = useState(null)

    //Access the Data of the User
    const thisUser = auth().currentUser;
    const userID = thisUser?.uid;
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userID) {
                    const snapshot = await firestore().collection('users')
                        .where('user_id', '==', userID)
                        .get();
                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]; // Assuming only one user document
                    setData(userData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userID]);

    const { dispatchSignedIn } = useContext(SignInContext)
    async function handleLogout() {
        Alert.alert(
            "Logout Confirmation",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Logout cancelled"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        auth().signOut().then(
                            alert('User has been Successfully Logout..!!!'))
                        // dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: null } });
                    }
                }
            ],
            { cancelable: false }
        );
    }


    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} style={{ flex: 1 }}>
                <View style={styles.dataContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            size={95}
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IQRp11uZmQjD67o_OcOzjxjAzmGRHNoT7w&s" }}
                        />

                        <View style={{ marginLeft: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: isDarkMode ? 'grey' : 'white', fontSize: 18 }}>{data?.name || 'No Specific Name'} </Text>
                            <Text style={{ color: isDarkMode ? 'grey' : 'white', fontSize: 12 }}> {data?.email || 'No Specific Email'} </Text>
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
                    icon={({ focused, color, size }) => (
                        <Icon
                            type="material-community"
                            name="credit-card-outline"
                            color={focused ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Promotions"
                    labelStyle={{ color: colors.grey3 }}
                    icon={({ color, size, focused }) => (
                        <Icon
                            type="material-community"
                            name="tag-heart"
                            color={focused ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Settings"
                    labelStyle={{ color: colors.grey3 }}
                    icon={({ color, size, focused }) => (
                        <Icon
                            type="material-community"
                            name="cog-outline"
                            color={focused ? '#7cc' : 'grey'}
                            size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Help"
                    labelStyle={{ color: colors.grey3 }}
                    icon={({ focused, color, size }) => (
                        <Icon
                            type="material-community"
                            name="lifebuoy"
                            color={focused ? '#7cc' : 'grey'}
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
                <TouchableOpacity style={{ marginTop: '15%', marginBottom: 0 }} >
                    <DrawerItem
                        onPress={handleLogout}
                        label='Log Out'
                        labelStyle={{ color: colors.grey3 }}
                        icon={({ color, size, focused }) => (
                            <Icon
                                type="material-community"
                                name="logout-variant"
                                size={size}
                                color={focused ? '#7cc' : 'grey'}
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
        width: 300
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
