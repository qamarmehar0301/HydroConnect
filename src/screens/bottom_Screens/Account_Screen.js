import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Image } from "react-native-animatable";
import { colors } from "../../global/styles";
import { Icon } from 'react-native-elements';
import { useTheme } from "../../component/DarkTheme";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { SignInContext } from "../../navigaiton/Contexts/AuthContext";

export default function Account_Screen({ navigation }) {

    const { isDarkMode } = useTheme();
    const styles = isDarkMode ? darkStyles : lightStyles;
    const [data, setData] = useState(null)
    const { dispatchSignedIn } = useContext(SignInContext)

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

    const handleLogout = () => {
        try {
            auth().
                signOut().
                then(
                    () => {
                        console.log('User has been Signed out successfully..!!')
                        // dispatchSignedIn({ type: 'LOGOUT' });
                        dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: "seller-sign-in" } })
                    }
                )

        } catch (error) {
            alert(error)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : 'white' }}>
            <View style={styles.container1}>
                <View style={styles.profile_Container}>
                    <View style={styles.profile_Img}>
                        <Image
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IQRp11uZmQjD67o_OcOzjxjAzmGRHNoT7w&s" }}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        <Text style={styles.nameText}> {data?.name || 'No Specific Name'} </Text>
                    </View>
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profile_Screen') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Icon
                                name="account"
                                type="material-community"
                                size={28}
                                color={isDarkMode ? 'white' : 'black'}
                                iconStyle={{ marginHorizontal: '5%' }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}> My Profile </Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            name="arrow-right-thin"
                            type="material-community"
                            size={28}
                            color={isDarkMode ? 'white' : 'black'}
                            iconStyle={{ marginHorizontal: '5%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('My_Order') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Icon
                                name="view-list"
                                type="material"
                                size={28}
                                color={isDarkMode ? 'white' : 'black'}
                                iconStyle={{ marginHorizontal: '5%' }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}> Order History </Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            name="arrow-right-thin"
                            type="material-community"
                            size={28}
                            color={isDarkMode ? 'white' : 'black'}
                            iconStyle={{ marginHorizontal: '5%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Handle_Cart') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Icon
                                name="shopping-cart"
                                type="material"
                                size={28}
                                color={isDarkMode ? 'white' : 'black'}
                                iconStyle={{ marginHorizontal: '5%' }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}> My Cart </Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            name="arrow-right-thin"
                            type="material-community"
                            size={28}
                            color={isDarkMode ? 'white' : 'black'}
                            iconStyle={{ marginHorizontal: '5%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Privacy') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Icon
                                name="security"
                                type="material-community"
                                size={28}
                                color={isDarkMode ? 'white' : 'black'}
                                iconStyle={{ marginHorizontal: '5%' }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}> Privacy Policy </Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            name="arrow-right-thin"
                            type="material-community"
                            size={28}
                            color={isDarkMode ? 'white' : 'black'}
                            iconStyle={{ marginHorizontal: '5%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('TermsAndConditionsPage') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Icon
                                name="text-box-check-outline"
                                type="material-community"
                                size={28}
                                color={isDarkMode ? 'white' : 'black'}
                                iconStyle={{ marginHorizontal: '5%' }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}>Terms & Conditions </Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            name="arrow-right-thin"
                            type="material-community"
                            size={28}
                            color={isDarkMode ? 'white' : 'black'}
                            iconStyle={{ marginHorizontal: '5%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                        <View>
                            <Icon
                                name="logout-variant"
                                type="material-community"
                                size={28}
                                color={isDarkMode ? 'white' : 'black'}
                                iconStyle={{ marginHorizontal: '5%' }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}> Log Out </Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            name="arrow-right-thin"
                            type="material-community"
                            size={28}
                            color={isDarkMode ? 'white' : 'black'}
                            iconStyle={{ marginHorizontal: '5%' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>




        </ScrollView>
    )
}

const lightStyles = StyleSheet.create({
    container1: {
        backgroundColor: colors.theme,
        elevation: 10,
        borderBottomLeftRadius: 100,
        height: 250
    },
    profile_Container: {
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile_Img: {
        height: 155,
        width: 155,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    image: {
        resizeMode: 'contain',
        height: '90%',
        width: '90%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    button: {
        width: '95%',
        height: 80,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 18
    },
    nameText: {
        color: 'white',
        fontSize: 18
    }
});


const darkStyles = StyleSheet.create({
    container1: {
        backgroundColor: '#86939e',
        elevation: 10,
        borderBottomLeftRadius: 100,
    },
    profile_Container: {
        marginTop: '15%',
        marginVertical: '5%',
        alignItems: 'center',
    },
    profile_Img: {
        height: 155,
        width: 155,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    image: {
        resizeMode: 'contain',
        height: '90%',
        width: '90%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    button: {
        width: '95%',
        height: 80,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white',
        fontSize: 18
    },
    nameText: {
        color: 'black',
        fontSize: 18
    }
});
