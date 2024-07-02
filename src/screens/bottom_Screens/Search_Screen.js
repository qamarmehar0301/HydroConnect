import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground, Dimensions, Alert } from 'react-native';
import Search_Component from "../../component/Search_Component";
import { colors } from "../../global/styles";
import { filterData } from "../../global/data";
import { useTheme } from "../../component/DarkTheme";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Search_Screen({ navigation }) {

    const { isDarkMode } = useTheme();
    const styles = isDarkMode ? darkStyles : lightStyles ;

    const cardPressed = (data) => {
        const cat_name = data.name;
        navigation.navigate('Catagory Product', { Prd_Catagory: cat_name });
    }

    const searchPressed = (data) => {
        const cat_name = data;
        navigation.navigate('Catagory Product', { Prd_Catagory: cat_name });
    }

    return (
        <View style={styles.container}>
            <Search_Component serach_Now={searchPressed}/>

            <FlatList
                style={styles.flatList}
                data={filterData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => {cardPressed(item)}}>
                        <View style={styles.imageView}>
                            <ImageBackground
                                style={styles.image_bg}
                                source={item.image}
                            >
                                <View style={styles.textView}>
                                    <Text style={{ color: 'white' }}>{item.name}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={<Text style={styles.listHeader}>Top Categories</Text>}
            />


        </View>
    )
}

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    flatList: {
        flex: 1,
        marginTop: '-160%',
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: colors.grey3,
        paddingLeft: '3%'
    },
    imageView: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        width: SCREEN_WIDTH * 0.4475,
        height: SCREEN_WIDTH * 0.4475,
    },
    image_bg: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textView: {
        backgroundColor: 'rgba(52,52,52,0.3)',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    flatList: {
        flex: 1,
        marginTop: '-160%',
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white',
        paddingLeft: '3%'
    },
    imageView: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        width: SCREEN_WIDTH * 0.4475,
        height: SCREEN_WIDTH * 0.4475,
    },
    image_bg: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 3, 
        borderColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textView: {
        backgroundColor: 'rgba(52,52,52,0.3)',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});