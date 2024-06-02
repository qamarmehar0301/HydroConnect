import React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';

export default function Welcome_Screen({navigation}) {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ alignItems: 'center', marginBottom: '20%', marginTop: '13%' }}>
                <Text style={styles.text}>DISCOVER RESTAURANTS</Text>
                <Text style={styles.text}>IN YOUR AREA </Text>
            </View>

            {/* Swiper */}
            {/* <View style={{ flex: 4, justifyContent: 'center', marginTop: '15%' }}>
                <Swiper autoplay={true}>
                    <View style={styles.slide}>
                        <Image
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQerBKzse9EX5NE4jgZy-S2h_mlubGkDEnGnskQrxwjcA&s" }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.slide}>
                        <Image
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QlN4Ga-JG99c9TdOo9601r9anx6MHm0CkAgW6yeTBHpP70DgkZlzhmgEtrl9jIK9ZRg&usqp=CAU" }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKnoUHXOemR8aJByC5qTrdOCO9i143tOdXcOGu1oNEA&s" }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                </Swiper>
            </View>

            <View style={{ flex: 4, justifyContent: 'flex-end', marginBottom: '10%'}}>
                <View style={{ marginHorizontal: '5%', marginVertical: 20 }}>
                    <Button
                        title='Sign In'
                        titleStyle={parameters.buttonTitle}
                        buttonStyle={parameters.styledButton}
                        onPress={() => {navigation.navigate('SignIn')}}
                    />
                </View>
                <View style={{ marginHorizontal: '5%'}}>
                    <Button
                        title='Create an Account'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        onPress={() => {navigation.navigate('SignUp')}}
                    />
                </View>
            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 26,
        color: '#ff8c52',
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
        borderColor: colors.grey3,
        height: 50,
        paddingHorizontal: 20
    },
    cretaeBtnTitle: {
        color: colors.grey3,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -3,
    }
});

