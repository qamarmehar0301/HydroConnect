import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { colors, buttonStyle } from "../../global/styles";
import { Button, Icon } from "react-native-elements";
import Header from "../../component/Header";
import { Animated } from "react-native";
import { Formik } from 'formik'

export default function SignUp({ navigation }) {

    const initialValues = { name: '', mobile_no: '', address: '', email: '', password: '' }
    const [textInputFoucs, settextInputFoucs] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function signUp(data) {
        const { email, password } = data
        console.log(email,password)
        try {
            // const user_Credentials = await auth().createUserWithEmailAndPassword(email, password)
            Keyboard.dismiss
            Alert.alert('Account has been successfully created.')
        } catch (error) {
            if (error.code === 'Email is already in use.') {
                // Alert.alert(
                //     'That email address is already inuse'
                // )
            }
            if (error.code === 'auth/invalid-email') {
                Alert.alert(
                    'That email address is invalid'
                )
            }
            else {
                Alert.alert(error.code)
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Sign Up" navigation={navigation} />
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ marginLeft: '4%', marginTop: '3%' }}>
                        <Text style={styles.title}> Sign Up </Text>
                    </View>
                    <View style={{ marginLeft: '4%', marginTop: '3%' }}>
                        <Text style={styles.text1}> New on Hydro Connect ? </Text>
                    </View>
                </View>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => { signUp(values) }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Name is required';
                        } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
                            errors.name = 'Name must contain only alphabets';
                        }
                        if (!values.mobile_no) {
                            errors.mobile_no = 'Mobile number is required';
                        } else if (!/^[0-9]+$/.test(values.mobile_no)) {
                            errors.mobile_no = 'Mobile number must be digits only';
                        }
                        if (!values.address) {
                            errors.address = 'Address is required';
                        }
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
                            {/* Text Inputs  */}
                            <View style={{ marginTop: 10 }}>

                                {/* Name */}
                                <View style={styles.textInput1}>
                                    <Animated.View>
                                        <Icon
                                            name="person"
                                            type='material'
                                            iconStyle={{ color: 'grey' }}
                                        />
                                    </Animated.View>
                                    <TextInput
                                        placeholder='Name'
                                        placeholderTextColor='#86939e'
                                        style={{ width: '80%', color: 'black' }}
                                        onChangeText={props.handleChange('name')}
                                        value={props.values.name}
                                    />
                                </View>
                                {props.values.name.length < 1 ? null :
                                    props.errors.name &&
                                    <Text style={{ marginTop: -15, marginLeft: '6%', marginBottom: 10, color: '#D20062' }}>
                                        {props.errors.name}
                                    </Text>
                                }
                                {/* Mobile no */}
                                <View style={styles.textInput1}>
                                    <Animated.View>
                                        <Icon
                                            name="phone"
                                            type='material'
                                            iconStyle={{ color: 'grey' }}
                                        />
                                    </Animated.View>
                                    <TextInput
                                        placeholder='Mobile Number '
                                        placeholderTextColor='#86939e'
                                        style={{ width: '80%', color: 'black' }}
                                        keyboardType="number-pad"
                                        onChangeText={props.handleChange('mobile_no')}
                                        value={props.values.mobile_no}
                                    />
                                </View>
                                {props.values.mobile_no.length < 1 ? null :
                                    props.errors.mobile_no &&
                                    <Text style={{ marginTop: -15, marginLeft: '6%', marginBottom: 10, color: '#D20062' }}>
                                        {props.errors.mobile_no}
                                    </Text>
                                }
                                {/* Address */}
                                <View style={styles.textInput1}>
                                    <Animated.View>
                                        <Icon
                                            name="location-on"
                                            type='material'
                                            iconStyle={{ color: 'grey' }}
                                        />
                                    </Animated.View>
                                    <TextInput
                                        placeholder='Address'
                                        placeholderTextColor='#86939e'
                                        style={{ width: '80%', color: 'black' }}
                                        onChangeText={props.handleChange('address')}
                                        value={props.values.address}
                                    />

                                </View>
                                {/* E-mail */}
                                <View style={styles.textInput1}>
                                    <Animated.View>
                                        <Icon
                                            name="email"
                                            type='material'
                                            iconStyle={{ color: 'grey' }}
                                        />
                                    </Animated.View>
                                    <TextInput
                                        placeholder='Email'
                                        placeholderTextColor='#86939e'
                                        style={{ width: '80%', color: 'black' }}
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
                                {/* Password */}
                                <View style={styles.textInput2}>
                                    <Animated.View>
                                        <Icon
                                            name="lock"
                                            type='material'
                                            iconStyle={{ color: 'grey' }}
                                        />
                                    </Animated.View>
                                    <TextInput
                                        placeholder='Password'
                                        placeholderTextColor='#86939e'
                                        style={{ width: '80%', color: 'black' }}
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
                                    <Animated.View animation={textInputFoucs ? "" : "fadeInLeft"} duration={400} >

                                        <Icon
                                            name={showPassword ? "visibility" : "visibility-off"}
                                            type='material'
                                            iconStyle={{ color: 'grey', paddingRight: 10 }}
                                            style={{ marginRight: '5%' }}
                                            onPress={togglePasswordVisibility}
                                        />
                                    </Animated.View>
                                </View>
                                {props.values.password.length < 1 ? null :
                                    props.errors.password &&
                                    <Text style={{ marginTop: -15, marginLeft: '6%', marginBottom: 10, color: '#D20062' }}>
                                        {props.errors.password}
                                    </Text>
                                }
                            </View>

                            <View style={styles.view15}>
                                <Text style={styles.text3}> By creating or logging into an account you are</Text>
                                <View style={styles.view16}>
                                    <Text style={styles.text3}>agreeing with our  </Text>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Term & Conditions') }}>
                                        <Text style={styles.text4}> Terms & Conditions </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.text3}> and </Text>
                                </View>
                                <TouchableOpacity onPress={() => { navigation.navigate('Privacy') }}>
                                    <Text style={styles.text4}> Privacy Policy </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: '5%', marginVertical: 20 }}>
                                <Button
                                    title='Create my Account'
                                    titleStyle={buttonStyle.buttonTitle}
                                    buttonStyle={buttonStyle.styledButton}
                                    // onPress={() => { Alert.alert('alert') }}
                                    // onPress={()=>{
                                    //     // Keyboard.dismiss()
                                    //     props.handleSubmit}}
                                    onPress={props.handleSubmit}
                                />
                            </View>
                        </View>}
                </Formik>
                <View style={{ alignItems: 'center', marginTop: '3%', marginBottom: '3%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}> OR </Text>
                </View>
                <View>
                    <Text style={{ ...styles.text1, marginLeft: '5%' }}> Already have an account with Hydro Connect? </Text>
                </View>

                <View style={{ alignItems: 'flex-end', marginRight: '5%', marginTop: '5%' }}>
                    <Button
                        title='Sign In'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        onPress={() => {  navigation.navigate("SignIn")}}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: colors.theme,
        fontSize: 25,
        fontWeight: 'bold',
    },
    text1: {
        color: 'grey',
        fontSize: 16
    },
    view1: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        marginHorizontal: '5%',
        marginTop: 20,
        height: 48
    },
    email: {
        fontSize: 16,
        marginLeft: -20,
        marginBottom: -10
    },
    email_Icon: {
        fontSize: 24,
        padding: 0,
        marginBottom: 0,
        marginTop: 11,
        marginLeft: 2
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
    view15: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    text3: {
        fontSize: 13,
        color: 'grey'
    },

    view16: { flexDirection: 'row' },

    text4: {
        textDecorationLine: 'underline',
        color: 'green',
        fontSize: 13
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
    }
})