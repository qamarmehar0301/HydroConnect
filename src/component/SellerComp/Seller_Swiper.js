import react from 'react';
import { View, Image, StyleSheet, Text } from 'react-native'
import Swiper from 'react-native-swiper';

export default function Seller_Swiper({ navigation }) {
    return (
        <View style={styles.slider_card}>
            <Swiper autoplay={true} showsHorizontalScrollIndicator={false} style={{height: 180}}>
                <View>
                    <Image
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDYkI6aUShUhYxmrLA8mlacdnW6KhK2aOuygUpHSxlZI_STsK2NF_W7FJwSf9QRR0ZxY&usqp=CAU" }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <View>
                    <Image
                        source={{ uri: "https://t3.ftcdn.net/jpg/05/01/28/06/360_F_501280612_N5g9SqtoarqivsniAXnOo2OhEuTHB5lC.jpg" }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <View>
                    <Image
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5E9H_uiGL-W0fW84szO8KrtB2nWcO-r3S14CJBirJjT98qJzGVdIGjg-m-v25Ky31uFg&usqp=CAU" }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    slider_card: {
        height: 180, width: '90%',
        borderRadius: 12,
    },
    image: {
        height: '100%',
        width: '100%', 
        borderRadius: 12,

    }
})