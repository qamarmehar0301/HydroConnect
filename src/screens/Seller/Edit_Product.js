import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import Header from "../../component/Header";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { buttonStyle } from "../../global/styles";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'; // Assuming you're using React Native Firebase
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


export default function Edit_Product_Screen({ route, navigation }) {

  const { product } = route.params;

  const [selectedCategory, setSelectedCategory] = useState(product.category);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [tagLine, setTagLine] = useState(product.tagLine);
  const [quantity, setQuantity] = useState(product.quantity);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.imageUrl);

  const currentUser = auth().currentUser;
  const sellerId = currentUser.uid;

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

  const EditItemHandler = async () => {
    try {

      let imageUrl = image;
  
      // If the image was updated, upload the new image to Firebase Storage
      if (image !== product.imageUrl) {
        const filename = image.substring(image.lastIndexOf('/') + 1);
        const reference = storage().ref(`images/${filename}`);
        const task = reference.putFile(image);
        await task;
        imageUrl = await reference.getDownloadURL();
      }
  
      // Update product data in Firestore
      await firestore().collection('All_Products').doc(product.id).update({
        title,
        price,
        tagLine,
        quantity,
        category: selectedCategory,
        description,
        imageUrl,
        sellerId
      });
  
      Alert.alert('Edit Item', 'Product has been updated Successfully...!!!');
      navigation.navigate('My_Product_Screen');
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error Occurred', 'There was an error updating the product.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Header title="Edit Product" navigation={navigation} />

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
            value={tagLine} onChangeText={(text) => setTagLine(text)}
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
                  <Picker.Item label={product.category} value={product.category} />
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
            value={description} onChangeText={(text) => setDescription(text)}
          />

          <TouchableOpacity onPress={imagePick} style={styles.imageContainer}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <Text style={{ color: '#696969' }}>Product Image</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ marginHorizontal: '5%', marginBottom: 15 }}>
        <Button
          title='Edit Product'
          titleStyle={buttonStyle.buttonTitle}
          buttonStyle={buttonStyle.styledButton}
          onPress={EditItemHandler}
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
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

