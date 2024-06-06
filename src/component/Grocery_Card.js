import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, Alert, Animated } from 'react-native';
import { colors } from "../global/styles";
import { Icon, Button } from "react-native-elements";
import { useTheme } from "./DarkTheme";

export default function Grocery_Card({
  Prd_Image,
  Prd_Name,
  Prd_Price,
  onPressGrocery_Card
}) {
  const index2 = 10;
  const currentValue = new Animated.Value(1);
  const [Liked, setLiked] = useState(false);
  const [Counter, setCounter] = useState(-2);
  const [Visible, setVisible] = useState(false);

  const likeHandler = () => {
    if (!Liked) setVisible(true);
    setLiked(!Liked);
    setCounter(index2);
  };

  useEffect(() => {
    if (Liked) {
      Animated.spring(currentValue, {
        toValue: 3,
        friction: 2,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
          friction: 2,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      });
    }
  }, [Liked]);

  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.cardView}>
      <View style={{ height: '80%', width: '100%' }}>
        <TouchableOpacity onPress={onPressGrocery_Card}>
          <View style={styles.iconContainer}>
            <Icon
              name={Liked && (index2 == Counter) ? "favorite" : "favorite-border"}
              type="material"
              color='red'
              size={20}
              onPress={likeHandler}
              iconStyle={styles.iconStyle}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: Prd_Image }}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.Name}> {Prd_Name} </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}> Pkr: </Text>
              <Text style={styles.price2}> {Prd_Price} </Text>
            </View>
          </View>

        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          buttonStyle={styles.card_Btn}
          titleStyle={styles.title_Btn}
          onPress={() => { Alert.alert('Added to Cart!') }}
        />
      </View>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  cardView: {
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 0.8,
    height: 230,
    width: 170,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 100,
    height: '100%',
    width: '80%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: '5%',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  price2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  buttonContainer: {
    height: '20%',
    width: '100%',
  },
  card_Btn: {
    backgroundColor: colors.theme,
    height: '100%',
  },
  title_Btn: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const darkStyles = StyleSheet.create({
  cardView: {
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 0.8,
    height: 230,
    width: 170,
    backgroundColor: '#000000',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 100,
    height: '100%',
    width: '80%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: '5%',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  price2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    height: '20%',
    width: '100%',
  },
  card_Btn: {
    backgroundColor: 'white',
    height: '100%',
  },
  title_Btn: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
