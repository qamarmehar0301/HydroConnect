import React, {useState} from "react";
import { ScrollView, Text, View, FlatList, Pressable, StyleSheet,Image, Alert } from 'react-native';
// import { Icon } from "react-native-elements";
// import Header from "../component/Header";
import { colors } from "../../global/styles";
import { filterData } from "../../global/data";
import Home_Header from "../../component/Home_Header";

export default function Home_Screen() {

    const [checkIndex, setcheckIndex] = useState("0")

    return (
        <View>
            <Home_Header />

            <ScrollView showsVerticalScrollIndicator={true}>
                {/* Catagory  */}
                <View style={{ marginVertical: '3%' }}>
                    <View>
                        <Text style={styles.catagory}> All Catagories </Text>
                    </View>

                    <View style={{ marginHorizontal: '2%' }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={filterData}
                            keyExtractor={(item) => item.id}
                            extraData={checkIndex}
                            renderItem={({ item, index }) => (

                                <Pressable onPress={() => { setcheckIndex(item.id)}}>
                                    <View style={checkIndex === item.id ? { ...styles.selected_catagory_card } : { ...styles.catagory_card }} >

                                        <Image source={item.image} style={styles.catagorgy_card_image} />

                                        <View style={{ height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={checkIndex === item.id ? { ...styles.selected_catagorgy_card_text } : { ...styles.catagorgy_card_text }} > {item.name} </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    catagory: {
        fontSize: 20,
        color:  'black',
        marginLeft: '2.5%',
        marginBottom: '3%'
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
        backgroundColor: 'grey',
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
        color: 'white',
        fontWeight: 'bold'
    },
    catagorgy_card_text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
})