import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from "../../../component/DarkTheme";
import Header from "../../../component/Header";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { buttonStyle } from "../../../global/styles";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import { getStorage, ref, uploadBytes } from "firebase/storage";
import storage from '@react-native-firebase/storage';

export default function Add_Product_Screen({ navigation }) {

  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('fruits');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState()
  const [tagLine, settagLine] = useState()
  const [quantity, setQuantity] = useState()
  const [description, setDiscription] = useState()
  const [image, setImage] = useState(null);

  const currentUser = auth().currentUser;
  const sellerId = currentUser.uid;
  //const storage = getStorage();

  //Pick Image from the phone
  const imagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    const pickImage = () => {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const uri = response.assets[0].uri;
          setImage(uri);
        }
      });
    };

    const takePhoto = () => {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.error) {
          console.log('CameraPicker Error: ', response.error);
        } else {
          const uri = response.assets[0].uri;
          setImage(uri);
        }
      });
    };

    Alert.alert(
      'Select Image Source',
      'Choose an option',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Camera', onPress: takePhoto },
      ],
      { cancelable: true }
    );
  };

  //Upload Image 
  const uploadImage = async (image) => {
    const imageName = image.substring(image.lastIndexOf('/') + 1);
    const imageRef = storage().ref(`Product_Images/${imageName}`);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      await imageRef.put(blob);
      // Get download URL
      const downloadURL = await imageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image: ', error.message);
      throw new Error('Image upload failed');
    }
  };

  const AddItemHandler = async () => {
    if (!title || !price || !tagLine || !quantity || !description || !image) {
      alert('Please fill all fields first...!!!');
      return;
    }

    try {
      const downloadURL = await uploadImage(image);
      const Prd_Data = {
        title,
        price,
        tagLine,
        quantity,
        description,
        category: selectedCategory,
        imageUrl: downloadURL,
      };
      const Updated_Prd_Data = {
        title,
        price,
        tagLine,
        quantity,
        description,
        category: selectedCategory,
        imageUrl: downloadURL,
        sellerId
      };

      // // Add product to the seller's collection
      // await firestore()
      //   .collection("Products")
      //   .doc(sellerId)
      //   .collection("My_Products")
      //   .add(Prd_Data);

      // Add product to the common collection
      await firestore()
        .collection("All_Products")
        .add(Updated_Prd_Data);

      alert('Product has been Successfully Added..!!!');
      setTitle('');
      setPrice('');
      settagLine('');
      setQuantity('');
      setSelectedCategory('fruits');  // Default value if necessary
      setDiscription('');
      setImage(null);

    } catch (error) {
      alert('Error Occurred..!!', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Header title="Add New Product" navigation={navigation} />

      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Product Name'
            placeholderTextColor="#696969"
            style={styles.input}
            value={title} onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            placeholder='Product Price'
            placeholderTextColor="#696969"
            style={styles.input}
            keyboardType="numeric"
            value={price} onChangeText={(text) => setPrice(text)}
          />
          <TextInput
            placeholder='Product Tag Line'
            placeholderTextColor="#696969"
            style={styles.input}
            value={tagLine} onChangeText={(text) => settagLine(text)}
          />
          <TextInput
            placeholder='Available Product Quantity'
            placeholderTextColor="#696969"
            style={styles.input}
            keyboardType="numeric"
            value={quantity} onChangeText={(text) => setQuantity(text)}
          />

          <View style={styles.PickerContainer}>
            <View style={styles.labelPickerContainer}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.label}>Select Category: </Text>
              </View>
              <View style={styles.pickerCon1}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                >
                  <Picker.Item label="Fruits" value="fruits" />
                  <Picker.Item label="Vegetables" value="vegetables" />
                  <Picker.Item label="Dairy" value="dairy" />
                  <Picker.Item label="Frozenfood" value="frozenfood" />
                  <Picker.Item label="Meat" value="meat" />
                  <Picker.Item label="Petfood" value="petfood" />
                  <Picker.Item label="Seafood" value="seafood" />
                </Picker>
              </View>
            </View>
          </View>

          <TextInput
            placeholder='Product Description'
            placeholderTextColor="#696969"
            style={styles.input1}
            multiline={true}
            numberOfLines={4}
            value={description} onChangeText={(text) => setDiscription(text)}
          />

          <TouchableOpacity onPress={imagePick} style={styles.imageContainer}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <Text style={{ color: '#696969' }}>Product Image </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ marginHorizontal: '5%', marginBottom: 15 }}>
        <Button
          title='Add Product'
          titleStyle={buttonStyle.buttonTitle}
          buttonStyle={buttonStyle.styledButton}
          onPress={AddItemHandler}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: '5%',
    marginTop: '10%'
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: '#000'
  },
  PickerContainer: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    color: '#000',
    alignItems: 'center',
  },
  picker: {
    height: 40,
    width: 150,
    color: 'black',
  },
  pickerCon1: {
    backgroundColor: '#86939e',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 40,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  label: {
    fontSize: 13,
    color: 'grey',
    marginRight: '20%'
  },
  input1: {
    height: 122,
    flex: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    color: 'black',
    fontSize: 16,
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: 30,
  },
  imageContainer: {
    width: '90%',
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

