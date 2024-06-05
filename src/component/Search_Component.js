import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, FlatList, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { colors } from "../global/styles";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import {filterData} from '../global/data';
import { filter } from 'lodash';
import { useTheme } from "./DarkTheme";

export default function Search_Component() {

    const navigation = useNavigation();
    const [filteredData, setFilteredData] = useState([...filterData]);
    const [modalVisible, setModalVisible] = useState(false);
    const [textInputFocussed, setTextInputFocussed] = useState(false);
    const [searchText, setSearchText] = useState('');
    const textInput = useRef(null);

    const {isDarkMode} = useTheme();

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = filter(filterData, (item) => {
            return item.name.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredData(filtered);
    }

    const clearSearch = () => {
        setSearchText('');
        setFilteredData([...filterData]);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(true); setTextInputFocussed(true) }}>
                    <View style={styles.search_Area}>
                        <Icon
                            name="search"
                            type="material"
                            iconStyle={{ marginLeft: 5 }}
                            style={styles.search_Icon}
                            size={28}
                        />
                        <Text style={{ fontSize: 15, color: 'grey' }}> What are you looking for? </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Modal animationType="fade" transparent={false} visible={modalVisible}>
                    <View style={styles.modal}>
                        <View style={styles.view1}>
                            <View style={styles.textInput}>
                                <Animatable.View
                                    animation={textInputFocussed ? 'fadeInRight' : 'fadeInLeft'}
                                    duration={600}
                                >
                                    <Icon
                                        name={textInputFocussed ? "arrow-back" : "search"}
                                        onPress={() => {
                                            if (textInputFocussed) {
                                                setModalVisible(false)
                                                setTextInputFocussed(false)
                                            } else {
                                                setTextInputFocussed(true)
                                            }
                                        }}
                                        style={styles.icon2}
                                        iconStyle={{ marginLeft: 10 }}
                                        type="material"
                                    />
                                </Animatable.View>
                                <TextInput
                                    style={{ width: '94%', color: 'black', marginLeft: 20 }}
                                    autoFocus={false}
                                    value={searchText}
                                    onChangeText={(text) => handleSearch(text)}
                                    ref={textInput}
                                    onFocus={() => { setTextInputFocussed(true) }}
                                    onBlur={() => { setTextInputFocussed(false) }}
                                />
                                <Animatable.View>
                                    <Icon
                                        name={searchText ? "cancel" : null}
                                        onPress={() => {
                                            if (searchText) {
                                                clearSearch();
                                                // textInput.current.clear();
                                            }
                                        }}
                                        style={styles.icon2}
                                        iconStyle={{ marginRight: 10 }}
                                        type="material"
                                    />
                                </Animatable.View>
                            </View>
                        </View>
                        <FlatList
                            data={filterData}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        // navigation.navigate('Search_Result', { item: item.name });
                                        Alert.alert('ok')
                                        setModalVisible(false);
                                        setTextInputFocussed(false);
                                    }}
                                >
                                    <View style={styles.view2}>
                                        <Text style={{ color: 'grey', fontSize: 15 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    search_Area: {
        marginTop: '3%',
        width: '94%',
        borderWidth: 1,
        backgroundColor: '#FAF9F6',
        borderRadius: 12,
        borderColor: 'grey',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search_Icon: {
        fontSize: 24,
        padding: 12,
        color: '#ffff',
    },
    modal: {
        flex: 1,
    },
    view1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    view2: {
        flexDirection: 'row',
        padding: 15,
        marginLeft: 15,
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#FAF9F6',
        borderRadius: 12,
        borderColor: 'grey',
        paddingHorizontal: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '94%',
        marginTop: '3%',
    },
    icon2: {
        fontSize: 24,
        padding: 5,
        color: colors.grey3,
    }
});
