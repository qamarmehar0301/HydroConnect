import React, { useState , useContext} from "react";
import { ScrollView, Text, View, FlatList, Pressable, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { colors } from "../../global/styles";
import { filterData, deliveryData, groceryStoreData } from "../../global/data";
import Home_Header from "../../component/Home_Header";
import Offer_Card from "../../component/Offer_Card";
import Home_Swiper from "../../component/Home_Swiper";
import Promotion_Card from "../../component/Promotion_card";
import Home_Contact from "../../component/Home_Contact";
import { useTheme } from "../../component/DarkTheme";
import { SignInContext } from "../../navigaiton/Contexts/AuthContext";

const SCREEN_WIDTH = Dimensions.get('window').width

export default function Home_Screen({ navigation }) {

    const [checkIndex, setcheckIndex] = useState("0")
    const { isDarkMode } = useTheme();
    const {dispatchSignedIn} = useContext(SignInContext)

    const handlePress = (category) => {
        setcheckIndex(category.id);
        const cat_name = category.name;
        navigation.navigate('Catagory Product', { Prd_Catagory: cat_name });
    };

    const cardPressed = (data) => {
        const prd_data = data;
        navigation.navigate('ProductDetials', { productData: prd_data })
    }

    const cartIconpressed = () => {
        navigation.navigate('Handle_Cart')
    }

    const handleLogout = () => {
        console.log('User signout')
        dispatchSignedIn({ type: "SIGN_IN_STATE", payload: { userToken: null } })
    }

    return (
        <View style={{ backgroundColor: isDarkMode ? '#000000' : 'white' }}>
            <ScrollView showsVerticalScrollIndicator={true} stickyHeaderIndices={[0]}>
                <View>
                    <Home_Header navigation={navigation} cartIconPress={cartIconpressed} onLogoutPress={handleLogout} />
                </View>
                {/* Slider*/}
                <View style={{ marginTop: '5%' }}>
                    <Home_Swiper navigation={navigation} />
                </View>

                {/* Catagory  */}
                <View style={{ marginVertical: '3%' }}>
                    <View>
                        <Text style={[styles.catagory, { color: isDarkMode ? 'white' : 'black' }]}> All Catagories </Text>
                    </View>

                    <View style={{ marginHorizontal: '2%' }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={filterData}
                            keyExtractor={(item) => item.id}
                            extraData={checkIndex}
                            renderItem={({ item, index }) => (

                                <Pressable onPress={() => handlePress(item)} >
                                    <View style={checkIndex === item.id ? { ...styles.selected_catagory_card } : { ...styles.catagory_card, backgroundColor: isDarkMode ? 'black' : 'grey', borderWidth: 1, borderColor: 'white' }} >

                                        <Image source={item.image} style={styles.catagorgy_card_image} />

                                        <View style={{ height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={checkIndex === item.id ? { ...styles.selected_catagorgy_card_text } : { ...styles.catagorgy_card_text, color: isDarkMode ? 'white' : 'white' }} > {item.name} </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>

                {/* Free Delivery */}
                <View>
                    <View>
                        <Text style={[styles.catagory, { color: isDarkMode ? 'white' : 'black' }]}>Free Delivery Now</Text>
                    </View>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: '1%' }}>
                            <Text style={[styles.timer_text, { color: isDarkMode ? 'white' : 'black' }]}> Avaliable till </Text>
                            <CountDown
                                until={5000}
                                size={13}
                                digitStyle={{ backgroundColor: isDarkMode ? 'white' : colors.theme, borderRadius: 10 }}
                                timeToShow={['H', 'M', 'S']}
                            // timeLabels = {{ h: 'Hours ' ,m: 'Min ', s:'Sec'}}
                            />
                        </View>
                        <View>
                            <FlatList
                                style={{ marginLeft: '1.5%', marginBottom: 10 }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={deliveryData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <Offer_Card
                                            Prd_Image={item.image}
                                            Prd_Price={item.price}
                                            Prd_Name={item.name}
                                            onPressOffer_Card={() => { cardPressed(item) }}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>

                {/* Promotion  */}
                <View>
                    <View>
                        <Text style={[styles.catagory, { color: isDarkMode ? 'white' : 'black' }]}>Highly Rated Stores</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: SCREEN_WIDTH }}>
                            {
                                groceryStoreData.map(item => (
                                    <View key={item.id} style={{ paddingBottom: '5%', marginHorizontal: '1.5%' }} >
                                        <Promotion_Card
                                            screenWidth={SCREEN_WIDTH * 0.95}
                                            images={item.Image}
                                            storeName={item.name}
                                            distance={item.distance}
                                            rating={item.rating}
                                            noOfReviews={item.noOfRewies}
                                            businessAddress={item.businessAddress}
                                            //onPresFood_Card ={() => { navigation.navigate('Rest_Profile_Screen', { id: item.id, resturant: item.resturantsName }) }}
                                            onPresPrm_Card={() => { Alert.alert('Future Work') }}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>

                {/* Contact  */}
                <View>
                    <Home_Contact />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    catagory: {
        fontSize: 20,
        color: 'black',
        marginLeft: '2.5%',
        marginBottom: '3%',
        fontWeight: 'bold'
    },
    selected_catagory_card: {
        backgroundColor: colors.theme,
        elevation: 2.5,
        borderRadius: 15,
        height: 140,
        width: 115,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    catagory_card: {
        //backgroundColor: 'grey',
        elevation: 2.5,
        borderRadius: 15,
        height: 140,
        width: 115,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    catagorgy_card_image: {
        height: '70%',
        width: '80%',
        borderRadius: 70,
    },
    selected_catagorgy_card_text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    catagorgy_card_text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    timer_text: {
        color: 'black',
        fontSize: 16,
        marginHorizontal: '2.5%',
        marginBottom: '3%'
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 220,
    },
    swiper: {
        backgroundColor: 'pink',
        height: 180,
        width: '100%',

    },
})