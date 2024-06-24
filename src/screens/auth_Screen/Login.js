import React, { useState, useRef, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TextInput, Alert, TouchableOpacity, Modal, Keyboard, ScrollView } from "react-native";
import Header from "../../component/Header";
import { buttonStyle, colors } from "../../global/styles";
import { Icon, Button, SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SignInContext } from "../../navigaiton/Contexts/AuthContext";


GoogleSignin.configure({
    // Configure your Google sign-in options here
    // Replace these values with your actual webClientId and other options
    webClientId: '165036286443-dqeuik771p7rii6ecjunr2kis9f2ogj3.apps.googleusercontent.com',
});

export default function Login({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);
    const [textInputFoucs, settextInputFoucs] = useState(false);
    const textInput1 = useRef(1);
    const textInput2 = useRef(2);
    const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
    const { dispatchSignedIn } = useContext(SignInContext)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = async (values) => {
        try {
            const { forgot_email } = values;

            const emailExists = await checkEmailExists(forgot_email);

            if (emailExists) {

                await auth().sendPasswordResetEmail(forgot_email);
                Alert.alert('Password reset email sent. Check your email inbox.');
                setForgotPasswordModalVisible(false);
            } else {
                Alert.alert('Email not found in our records.');
            }
        } catch (error) {
            Alert.alert('Error sending password reset email:', error.message);
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const userDoc = await firestore().collection('users').where('email', '==', email).get();
            return !userDoc.empty;
        } catch (error) {
            console.error('Error checking email existence:', error);
            throw error;
        }
    };

    async function SignIn(data, resetForm) {
        try {
            const { email, password } = data;

            const userCredentials = await auth().signInWithEmailAndPassword(email, password)
            const user = userCredentials.user;

            //Fetching the data from the firestore collection
            const userDoc = await firestore().collection('users').doc(user.uid).get();
            //Reset the Form
            resetForm();

            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.role == 'seller') {
                    // navigation.navigate('Seller_Home')
                    dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: "seller-sign-in" } })
                }
                else if (userData.role == 'buyer') {
                    // navigation.navigate('Drawer_Navigator')
                    dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: "signed-in" } })
                }
                else {
                    console.log('User Does not Exists.')
                }
            }

        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('No user found with this email!');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('Incorrect password!');
            } else {
                console.error(error);
                Alert.alert('An error occurred. Please try again.');
            }
        }
    }

    const signInWithGoogle = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            //navigation.navigate('Home'); // Navigate to the appropriate screen
            Alert.alert('Sign in done')
        } catch (error) {
            console.error('Google sign-in error:', error);
            Alert.alert('Error signing in with Google:', error.message);
        }
    };

    return (
        <View>
            <Header title="Sign-In" navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ marginLeft: '6%', marginTop: '5%' }}>
                    <Text style={styles.title}> Sign-In </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: '3%', marginBottom: '8%' }}>
                    <Text style={styles.text1}> Please Enter the Email and Password </Text>
                    <Text style={styles.text1}> registered with your account. </Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { resetForm }) => { SignIn(values, resetForm) }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
                            errors.email = 'Enter Proper email';
                        }
                        if (!values.password) {
                            errors.password = 'Password is required';
                        } else if (values.password.length < 6) {
                            errors.password = 'Password must be at least 6 characters';
                        }
                        return errors;
                    }}
                >

                    {(props) =>
                        <View>
                            {/* Input Fields */}
                            <View style={styles.textInput1}>
                                <Icon
                                    name="email"
                                    type='material'
                                    iconStyle={{ color: 'grey' }}
                                />
                                <TextInput
                                    placeholder='Email'
                                    placeholderTextColor='#86939e'
                                    style={{ width: '80%', color: 'black' }}
                                    ref={textInput1}
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                />
                            </View>
                            {props.values.email.length < 1 ? null :
                                props.errors.email &&
                                <Text style={{ marginTop: -15, marginLeft: '6%', marginBottom: 10, color: '#D20062' }}>
                                    {props.errors.email}
                                </Text>
                            }
                            <View style={styles.textInput2}>
                                <Icon
                                    name="lock"
                                    type='material'
                                    iconStyle={{ color: 'grey' }}
                                />
                                <TextInput
                                    placeholder='Password'
                                    placeholderTextColor='#86939e'
                                    style={{ width: '80%', color: 'black' }}
                                    ref={textInput2}
                                    type='password'
                                    onFocus={() => {
                                        settextInputFoucs(false)
                                    }}
                                    onBlur={() => {
                                        settextInputFoucs(true)
                                    }}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    secureTextEntry={!showPassword}
                                />
                                <Icon
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    type='material'
                                    iconStyle={{ color: 'grey', paddingRight: 10 }}
                                    style={{ marginRight: '5%' }}
                                    onPress={togglePasswordVisibility}
                                />
                            </View>
                            {props.values.password.length < 1 ? null :
                                props.errors.password &&
                                <Text style={{ marginTop: -15, marginLeft: '6%', marginBottom: 10, color: '#D20062' }}>
                                    {props.errors.password}
                                </Text>
                            }

                            {/* Sign-In Buttons */}
                            <View style={{ marginHorizontal: '5%', marginVertical: 20 }}>
                                <Button
                                    title='Sign In'
                                    titleStyle={buttonStyle.buttonTitle}
                                    buttonStyle={buttonStyle.styledButton}
                                    onPress={props.handleSubmit}
                                />
                            </View>
                        </View>
                    }
                </Formik>


                {/* Forgot Password */}
                <View>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => { setForgotPasswordModalVisible(true) }} >
                        <Text style={{ ...styles.text1, textDecorationLine: "underline", marginRight: '5%' }}> Forgot Password? </Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={forgotPasswordModalVisible}
                        onRequestClose={() => setForgotPasswordModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.forgot_Text}>
                                    <Text style={styles.modalHeaderText}>Forgot Password?</Text>
                                    <Icon
                                        name="cancel"
                                        type='material'
                                        iconStyle={{ color: 'grey' }}
                                        onPress={() => setForgotPasswordModalVisible(false)}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', marginTop: '3%' }}>
                                    <Text style={styles.text1}> Please Enter your registered email </Text>
                                    <Text style={styles.text1}> to get the reset link  </Text>
                                </View>
                                <Formik
                                    initialValues={{ forgot_email: '' }}
                                    onSubmit={(values) => { handleForgotPassword(values) }}
                                    validate={(values) => {
                                        const errors = {}
                                        if (!values.forgot_email) {
                                            errors.forgot_email = 'Email is required';
                                        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.forgot_email)) {
                                            errors.forgot_email = 'Enter Proper email';
                                        }
                                        return errors;
                                    }}
                                >
                                    {(props) =>
                                        <View>
                                            <View style={styles.forgot_pass_cont}>

                                                <Icon
                                                    name="email"
                                                    type='material'
                                                    iconStyle={{ color: 'grey' }}
                                                />

                                                <TextInput
                                                    placeholder='Email'
                                                    placeholderTextColor='#86939e'
                                                    style={{ width: '80%', color: 'black' }}
                                                    // ref={textInput1}
                                                    onChangeText={props.handleChange('forgot_email')}
                                                    value={props.values.forgot_email}
                                                />
                                            </View>
                                            {props.values.forgot_email.length < 1 ? null :
                                                props.errors.forgot_email &&
                                                <Text style={{ marginTop: -15, marginLeft: '6%', marginBottom: 10, color: '#D20062' }}>
                                                    {props.errors.forgot_email}
                                                </Text>
                                            }
                                            <Button
                                                title="Get the Link"
                                                onPress={props.handleSubmit}
                                            //onPress={() => { Alert.alert('Get the link') }}
                                            />
                                        </View>}
                                </Formik>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={{ alignItems: 'center', marginTop: '10%', marginBottom: '10%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}> OR </Text>
                </View>

                {/* Google Button */}
                <View>
                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google'
                        style={styles.socialButton}
                        onPress={signInWithGoogle}
                    />
                </View>

                <View style={{ marginTop: '4%' }}>
                    <Text style={{ ...styles.text1, marginLeft: '5%' }}> New on HydroConnect? </Text>
                </View>

                <View style={{ alignItems: 'flex-end', marginRight: '5%', marginTop: '5%' }}>
                    <Button
                        title='Create an Account'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        onPress={() => { navigation.navigate("SignUp") }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#15AB4C',
        fontSize: 25,
        fontWeight: 'bold',
    },
    text1: {
        color: 'grey',
        fontSize: 14
    },
    textInput1: {
        borderWidth: 1,
        borderColor: '#86939e',
        marginHorizontal: '6%',
        marginBottom: '5%',
        borderRadius: 12,
        paddingLeft: 15,
        color: 'black',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    textInput2: {
        borderWidth: 1,
        borderColor: '#86939e',
        marginHorizontal: '6%',
        marginBottom: '5%',
        borderRadius: 12,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 15,
        color: 'black',
    },
    forgot_pass_cont: {
        borderWidth: 1,
        borderColor: '#86939e',
        marginVertical: '5%',
        borderRadius: 12,
        paddingLeft: 15,
        color: 'black',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    forgot_Text: {
        marginBottom: '4%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 150
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        elevation: 5,
    },
    modalHeaderText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    socialButton: {
        borderRadius: 12,
        height: 50,
        marginHorizontal: 20,
        backgroundColor: colors.button
    },
    createBtn: {
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.theme,
        height: 40,
        paddingHorizontal: 20
    },
    cretaeBtnTitle: {
        color: colors.theme,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: -3,
    },
})