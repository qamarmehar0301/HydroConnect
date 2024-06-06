import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from "../../component/DarkTheme";
import Header from '../../component/Header';
import { colors } from "../../global/styles";

export default function Profile_Screen({ navigation }) {
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>

      <Header title="My Profile" navigation={navigation} />

      <View style={styles.container1}>
        <View style={styles.profile_Container}>
          <View style={styles.profile_Img}>
            <Image
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IQRp11uZmQjD67o_OcOzjxjAzmGRHNoT7w&s" }}
              style={styles.image}
            />
          </View>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.inputText}>
          Name
        </Text>
        <TextInput
          placeholder='Muhammad Qamar'
          placeholderTextColor='#86939e'
          style={styles.input}
          editable={false}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.inputText}>
          Mobile Number
        </Text>
        <TextInput
          placeholder='03425288079'
          placeholderTextColor='#86939e'
          style={styles.input}
          editable={false}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputText}>
          E-mail
        </Text>
        <TextInput
          placeholder='qamarmehar.0301@gmail.com'
          placeholderTextColor='#86939e'
          style={styles.input}
          editable={false}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputText}>
          Address
        </Text>
        <TextInput
          placeholder='UET Lahore'
          placeholderTextColor='#86939e'
          style={styles.input}
          editable={false}
        />
      </View>

    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    backgroundColor: colors.theme,
    borderBottomLeftRadius: 100,
    height: 200,
    marginBottom: '5%'
  },
  profile_Container: {
    marginVertical: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile_Img: {
    height: 155,
    width: 155,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  image: {
    resizeMode: 'contain',
    height: '90%',
    width: '90%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  nameText: {
    color: 'white',
    fontSize: 18
  },
  textInputContainer: {
    marginBottom: '5%',
    paddingRight: '5%',
    paddingLeft: '3%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  inputText: {
    marginLeft: '2%',
    color: '#000',
    fontFamily: 'PT Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    color: '#708090',
    marginVertical: 10,
    paddingLeft: 10
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    backgroundColor: '#86939e',
    elevation: 10,
    borderBottomLeftRadius: 100,
    marginBottom: '5%'
  },
  profile_Container: {
    marginTop: '15%',
    marginVertical: '5%',
    alignItems: 'center',
  },
  profile_Img: {
    height: 155,
    width: 155,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  image: {
    resizeMode: 'contain',
    height: '90%',
    width: '90%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  nameText: {
    color: 'black',
    fontSize: 18
  },
  textInputContainer: {
    marginBottom: '5%',
    paddingRight: '5%',
    paddingLeft: '3%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  inputText: {
    marginLeft: '2%',
    color: '#fff',
    fontFamily: 'PT Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginVertical: 10,
    paddingLeft: 10
  },
});