// import React, { useState } from "react";
// import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput , Alert, Keyboard} from 'react-native';
// import { useTheme } from "../component/DarkTheme";
// import Header from "../component/Header";
// import { CardField, confirmPayment } from '@stripe/stripe-react-native';
// import creatPaymentIntent from "../API's/StripeAPI";

// export default function Checkout_Screen({ route, navigation }) {
//   const { isDarkMode } = useTheme();
//   const { totalAmount } = route.params;
//   const [cardInfo, setCardInfo] = useState(null)
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [cardHolderName, setCardHolderName] = useState('');

//   let priceData = {
//     amount: totalAmount,
//     currency: "usd"
//   }
//   const fetchCardInfo = (cardDetails) => {
//     if (cardDetails.complete) {
//       setCardInfo(cardDetails)
//     }
//     else {
//       setCardInfo(null)
//     }

//   }

//   const complete_Btn = async () => {
//     if (isProcessing) return; // Prevent the button from being pressed multiple times
//     setIsProcessing(true); // Disable the button when the process starts
//     try {
//       const res = await creatPaymentIntent(priceData);
//       Keyboard.dismiss()
//       console.log('Payment Intent Created Successfully!!');
//       if (res?.data?.paymentIntent) {
//         let confirmPayIntent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' });
//         console.log('Confirm Payment Successful!!!!', confirmPayIntent);
//         Alert.alert(
//           'Payment Successful',
//           `${totalAmount}rs has been deducted from your account ******${cardInfo.last4}.`,
//           [{ text: 'OK' }]
//         );
//       } else {
//         throw new Error('Payment intent not found in response');
//       }
//     } catch (error) {
//       console.error('Error raised during payment:', error);
//       Alert.alert(
//         'Payment Error',
//         'There was an error processing your payment. Please try again later.',
//         [{ text: 'OK' }]
//       );
//     } finally {
//       setIsProcessing(false); // Re-enable the button after the process is complete
//     } 
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
//       <Header title="Check Out" navigation={navigation} />

//       <View style={{ alignItems: 'center', marginTop: '15%' }}>
//         <View style={styles.imgCard}>
//           <Image
//             style={styles.img}
//             source={require('../assets/card.jpg')}
//           />
//         </View>
//       </View>

//       <View style={{ flex: 1, marginTop: 30, marginHorizontal: 10 }}>

//         <TextInput
//           placeholder="Cardholder Name"
//           placeholderTextColor='grey'
//           value={cardHolderName}
//           onChangeText={(text) => setCardHolderName(text)}
//           style={styles.name}

//         />
//         <CardField
//           postalCodeEnabled={false}
//           expiryMonthEnabled={false}
//           placeholders={{
//             number: '4242 4242 4242 4242',
//           }}
//           cardStyle={{
//             backgroundColor: 'grey',
//             textColor: '#000000',
//             borderRadius: 12,
//           }}
//           style={{
//             width: '100%',
//             height: 50,
//             marginVertical: 30,
//           }}
//           onCardChange={(cardDetails) => {
//             fetchCardInfo(cardDetails)
//           }}
//           onFocus={(focusedField) => {
//             console.log('focusField', focusedField);
//           }}
//         />

//         <TouchableOpacity
//           style={[
//             styles.chekout_Btn,
//             { backgroundColor: cardInfo ? '#C05300' : 'grey' }
//           ]}
//           disabled={!cardInfo}
//           onPress={complete_Btn}
//         >
//           <Text style={styles.btn_Text}>Confirm</Text>
//         </TouchableOpacity>

//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   imgCard: {
//     width: '90%',
//     height: 220,
//     borderRadius: 12,
//   },
//   img: {
//     height: '100%',
//     width: '100%',
//     borderRadius: 12
//   },
//   name: {
//     height: 50,
//     borderRadius: 12,
//     borderColor: 'grey',
//     borderWidth: 1,
//     marginHorizontal: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingLeft: 15,
//     fontSize: 16,
//     color: '#000'
//   },
//   chekout_Btn: {
//     height: 50,
//     borderRadius: 12,
//     marginHorizontal: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btn_Text: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#FFFFFF'
//   }
// });


import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import { useTheme } from "../component/DarkTheme";
import Header from "../component/Header";
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import creatPaymentIntent from "../API's/StripeAPI";

export default function Checkout_Screen({ route, navigation }) {
  const { isDarkMode } = useTheme();
  const { totalAmount } = route.params;
  const [cardInfo, setCardInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');

  const priceData = {
    amount: totalAmount,
    currency: "usd"
  };

  const fetchCardInfo = (cardDetails) => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };

  const complete_Btn = async () => {
    if (isProcessing) return; // Prevent the button from being pressed multiple times
    setIsProcessing(true); // Disable the button when the process starts
    try {
      const res = await creatPaymentIntent(priceData);
      Keyboard.dismiss();
      console.log('Payment Intent Created Successfully!!');
      if (res?.data?.paymentIntent) {
        let confirmPayIntent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' });
        console.log('Confirm Payment Successful!!!!', confirmPayIntent);
        // Navigate to order history page with necessary order details
        navigation.navigate('OrderHistory', {
          totalAmount,
          last4Digits: cardInfo.last4,
          // Add any other relevant order details here
        });
      } else {
        throw new Error('Payment intent not found in response');
      }
    } catch (error) {
      console.error('Error raised during payment:', error);
      Alert.alert(
        'Payment Error',
        'There was an error processing your payment. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false); // Re-enable the button after the process is complete
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
      <Header title="Check Out" navigation={navigation} />

      <View style={{ alignItems: 'center', marginTop: '15%' }}>
        <View style={styles.imgCard}>
          <Image
            style={styles.img}
            source={require('../assets/card.jpg')}
          />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: 30, marginHorizontal: 10 }}>

        <TextInput
          placeholder="Cardholder Name"
          placeholderTextColor='grey'
          value={cardHolderName}
          onChangeText={(text) => setCardHolderName(text)}
          style={styles.name}
        />

        <CardField
          postalCodeEnabled={false}
          expiryMonthEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: 'grey',
            textColor: '#000000',
            borderRadius: 12,
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            fetchCardInfo(cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />

        <TouchableOpacity
          style={[
            styles.chekout_Btn,
            { backgroundColor: cardInfo ? '#C05300' : 'grey' }
          ]}
          disabled={!cardInfo}
          onPress={complete_Btn}
        >
          <Text style={styles.btn_Text}>Confirm</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgCard: {
    width: '90%',
    height: 220,
    borderRadius: 12,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 12
  },
  name: {
    height: 50,
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    fontSize: 16,
    color: '#000'
  },
  chekout_Btn: {
    height: 50,
    borderRadius: 12,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_Text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
