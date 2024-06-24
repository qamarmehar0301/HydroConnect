import react from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native'
import Swiper from 'react-native-swiper';
import Home_Slider from './Home_Slider';

export default function Home_Swiper({navigation}) {
    return (
        <View >
            <Swiper autoplay={true} showsHorizontalScrollIndicator={false} style={{ height: 180 }}>
                <View style={styles.slide}>
                    <Home_Slider
                        OfferName='Vegitables'
                        OfferPer='30'
                        OfferBtn='Grab Now'
                        OfferImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fsZ_Pi3Z1_QpcwJuHqn3uE3bSl7t3zQXwA&s'
                        onPressBtn={()=>{navigation.navigate('Grocery Products')}}
                    />
                </View>
                <View style={styles.slide}>
                    <Home_Slider
                        OfferName='Fruits'
                        OfferPer='50'
                        OfferBtn='Grab Now'
                        OfferImg='https://t4.ftcdn.net/jpg/00/53/14/41/360_F_53144147_Zx2dgnSeefxIjOQ5cjD4PBdZF4m8M7sm.jpg'
                        onPressBtn={()=>{navigation.navigate('Grocery Products')}}
                    />
                </View>
                <View style={styles.slide}>
                    <Home_Slider
                        OfferName='Meat'
                        OfferPer='10'
                        OfferBtn='Grab Now'
                        OfferImg='https://t3.ftcdn.net/jpg/06/66/04/40/360_F_666044026_nKobnVEmUSCWCgTfr4NniUZ1E4AQ8Vn6.jpg'
                        onPressBtn={()=>{navigation.navigate('Grocery Products')}}
                    />
                </View>

            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})