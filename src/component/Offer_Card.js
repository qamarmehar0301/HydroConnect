import React, {useState, useEffect} from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, Alert, Animated } from 'react-native';
import { colors } from "../global/styles";
import { Icon } from "react-native-elements";
import { useTheme } from "./DarkTheme";

export default function Offer_Card({
    Prd_Image,
    Prd_Name,
    Prd_Price,
    onPressOffer_Card
}) {

    const index2 = 10
    const currentValue = new Animated.Value(1)
    const [Liked, setLiked] = useState(false)
    const [Counter, setCounter] = useState(-2)
    const [Visible, setVisible] = useState(false)

    const likeHandler = () => {
        if (Liked == false)
            setVisible(true)

        setLiked(!Liked)
        setCounter(index2)
    }

    useEffect(() => {
        if (Liked == true) {
            Animated.spring(currentValue, {
                toValue: 3,
                friction: 2,
                useNativeDriver: true
            }).start(() => {
                Animated.spring(currentValue, {
                    toValue: 1,
                    friction: 2,
                    useNativeDriver: true
                }).start(() => {
                    setVisible(false)
                })
            })
        }
    }, [Liked])

    const {isDarkMode} = useTheme();
    const styles =  isDarkMode ? darkStyles : lightStyles 
    return (
        <TouchableOpacity onPress={onPressOffer_Card}>
            <View style={styles.cardView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '3%', marginVertical: '3%' }}>
                    <Text style={{ color: 'grey', fontSize: 14, backgroundColor: '#D3D3D3', borderRadius: 5 }}> New </Text>
                    <Icon
                        name={Liked && (index2 == Counter) ? "favorite" : "favorite-border"}
                        type="material"
                        color='red'
                        size={20}
                        onPress={likeHandler}
                    />
                </View>
                <Image
                    style={{ ...styles.image }}
                   // source={{ uri: "https://cdn.britannica.com/72/140372-050-094484AF/ginger-root.jpg" }}
                    source={{ uri: Prd_Image }}
                />
                <View style={{ alignItems: 'center', marginTop: '5%' }}>
                    <View>
                        <Text style={styles.Name}> {Prd_Name} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.price}> Pkr: </Text>
                        <Text style={styles.price2}>{Prd_Price} </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const lightStyles = StyleSheet.create({
    cardView: {
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 0.8,
        height: 180,
        width: 140,
        backgroundColor: 'white'
    },
    image: {
        marginTop: '5%',
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 80,
        width: 100
    },
    Name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'black',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'black',
    },
    price2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'grey',
    },
})
const darkStyles = StyleSheet.create({
    cardView: {
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 0.8,
        height: 180,
        width: 140,
        backgroundColor: '#000',
        borderColor: 'white'
    },
    image: {
        marginTop: '5%',
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 80,
        width: 100
    },
    Name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#fff',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#fff',
    },
    price2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#fff',
    },
})