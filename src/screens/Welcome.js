import React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { buttonStyle, colors } from '../global/styles';

export default function Welcome_Screen({navigation}) {
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
                            resizeMode= 'cover'
                        />
                    </View>

                    {/* <View style={styles.slide}>
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
                    </View>  */}

                </Swiper>
            </View>
            
            <View style={{ flex: 4, justifyContent: 'flex-end', marginBottom: '10%'}}>
                <View style={{ marginHorizontal: '5%', marginVertical: 20 }}>
                    <Button
                        title='Sign In'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        // onPress={() => {navigation.navigate('SignIn')}}
                        onPress={()=>{navigation.navigate("SignIn")}}
                    />
                </View>
                <View style={{ marginHorizontal: '5%'}}>
                    <Button
                        title='Create an Account'
                        buttonStyle={styles.createBtn}
                        titleStyle={styles.cretaeBtnTitle}
                        // onPress={() => {navigation.navigate('SignUp')}}
                        onPress={()=>{navigation.navigate("SignUp")}}
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

