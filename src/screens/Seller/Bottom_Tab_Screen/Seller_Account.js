import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Image } from "react-native-animatable";
import { colors, buttonStyle } from "../../../global/styles";
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { SignInContext } from "../../../navigaiton/Contexts/AuthContext";
import Header from "../../../component/Header";

export default function S_Account_Screen({ navigation }) {
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
                    console.log('User signout'), 
                    dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: null } }))
              }
            }
          ],
          { cancelable: false }
        );
      };


    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

            <Header title="My Profile" navigation={navigation} />

            <View style={styles.container1}>
                <View style={styles.profile_Container}>
                    <View style={styles.profile_Img}>
                        <Image
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IQRp11uZmQjD67o_OcOzjxjAzmGRHNoT7w&s" }}
                            style={styles.image}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.textInputContainer}>
                <Text style={styles.inputText}>
                    Name
                </Text>
                <TextInput
                    value={data?.name || 'No Specific Name'}
                    style={styles.input}
                    editable={false}
                />
            </View>

            <View style={styles.textInputContainer}>
                <Text style={styles.inputText}>
                    Mobile Number
                </Text>
                <TextInput
                    value={data?.mobile_no || 'No Specific Phone Number'}
                    style={styles.input}
                    editable={false}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.inputText}>
                    E-mail
                </Text>
                <TextInput
                    value={data?.email || 'No Specific Email'}
                    style={styles.input}
                    editable={false}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.inputText}>
                    Address
                </Text>
                <TextInput
                    value={data?.address || 'No Specific Address'}
                    style={styles.input}
                    editable={false}
                />
            </View>

            <View style={{ marginHorizontal: '5%' }}>
                <Button
                    title='Logout'
                    titleStyle={buttonStyle.buttonTitle}
                    buttonStyle={buttonStyle.styledButton}
                    onPress={handleLogout}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        backgroundColor: colors.theme,
        borderBottomLeftRadius: 100,
        height: 200,
        marginBottom: '5%'
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
    nameText: {
        color: 'white',
        fontSize: 18
    },
    textInputContainer: {
        marginBottom: '5%',
        paddingRight: '5%',
        paddingLeft: '3%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    inputText: {
        marginLeft: '2%',
        color: '#000',
        fontFamily: 'PT Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    input: {
        width: '100%',
        flexShrink: 0,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#A9A9A9',
        color: '#708090',
        marginVertical: 10,
        paddingLeft: 10
    },
});

