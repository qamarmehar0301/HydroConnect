import React, { useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { colors } from '../global/styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SignInContext } from '../navigaiton/Contexts/AuthContext';

export default function Welcome_Screen({ navigation }) {

    const { dispatchSignedIn } = useContext(SignInContext)

    // useEffect(() => {
    //     const unsubscribe = auth().onAuthStateChanged(user => {
    //         if (user) {
    //             // User is signed in, navigate to relevant page
    //             navigateToRelevantPage(user.uid);
    //         } else {
    //             // No user is signed in, navigate to the login screen
    //             //navigation.replace('Login');
    //         }
    //     });

    //     return unsubscribe; // Cleanup function
    // }, []);

    // const navigateToRelevantPage = async (userId) => {
    //     try {
    //         const userDoc = await firestore().collection('users').doc(userId).get();
    //         if (userDoc.exists) {
    //             const userData = userDoc.data();
    //             if (userData.role === 'seller') {
    //                 console.log('Seller login hi')
    //                 dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: "seller-sign-in" } })
    //             } else if (userData.role === 'buyer') {
    //                 dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: "signed-in" } })
    //                 console.log('Buyer login hi')
    //             }
    //         } else {
    //             console.log('User does not exist.');
    //             // Handle the case where user data does not exist
    //         }
    //     } catch (error) {
    //         console.error('Error navigating to relevant page:', error);
    //         // Handle any errors that occur during navigation
    //     }
    // };

    return (
        <View style={{ flex: 1, backgroundColor: colors.theme }}>

            <View style={{ alignItems: 'center', marginBottom: '20%', marginTop: '13%' }}>
                <Text style={styles.text}>GET YOUR GROCERY WITH</Text>
                <Text style={styles.text}> HYDRO CONNECT </Text>
            </View>

            {/* Swiper */}
            <View style={{ flex: 4, justifyContent: 'center', marginTop: '15%' }}>
                <Swiper autoplay={true}>
                    <View style={styles.slide}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D" }}
                            style={styles.image}
                            resizeMode='cover'
                        />
                    </View>


                </Swiper>
            </View>

            <View style={{ flex: 4, justifyContent: 'flex-end', marginBottom: '10%' }}>
                <View style={{ marginHorizontal: '5%', marginVertical: 20 }}>
                    <Button
                        title='Sign In'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        onPress={() => { navigation.navigate("SignIn") }}
                    />
                </View>
                <View style={{ marginHorizontal: '5%' }}>
                    <Button
                        title='Create an Account'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        onPress={() => { navigation.navigate("SignUp") }}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'Cinzel Black'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    createBtn: {
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'grey',
        height: 50,
        paddingHorizontal: 20
    },
    cretaeBtnTitle: {
        color: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -3,
    }
});

