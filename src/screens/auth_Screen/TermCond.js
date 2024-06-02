import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../global/styles";
import Header from "../../component/Header";

const TermsAndConditionsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Terms & Conditions" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.paragraph}>
          By accessing or using the Hydro Connect mobile application
          (the "App") and any services offered through the App (the "Services"),
          you agree to be bound by these Terms and Conditions ("Terms").
        </Text>
        <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          These Terms constitute a legally binding agreement between you and
          Hydro Connect. By accessing or using the App and Services, you
          agree to be bound by these Terms.
        </Text>
        <Text style={styles.subtitle}>2. Use of Services</Text>
        <Text style={styles.paragraph}>
          You agree to use the Services solely for your personal, non-commercial
          use and in accordance with these Terms and any applicable laws and
          regulations.
        </Text>
        <Text style={styles.subtitle}>3. User Accounts</Text>
        <Text style={styles.paragraph}>
          You may be required to create an account to access certain features
          of the App. You are responsible for maintaining the confidentiality
          of your account information and for all activities that occur under
          your account.
        </Text>
        <Text style={styles.subtitle}>4. Product Availability</Text>
        <Text style={styles.paragraph}>
          Product availability is subject to change without notice. Hydro Connect
          does not guarantee the availability of any specific product.
        </Text>
        <Text style={styles.subtitle}>5. Pricing and Payments</Text>
        <Text style={styles.paragraph}>
          All prices are subject to change without notice. You agree to pay all
          charges incurred by your account, including applicable taxes and fees.
        </Text>
        <Text style={styles.subtitle}>6. Delivery</Text>
        <Text style={styles.paragraph}>
          Delivery times are estimates and may vary. Hydro Connect is not liable
          for any delays in delivery. It is your responsibility to ensure that
          someone is available to receive the delivery.
        </Text>
        <Text style={styles.subtitle}>7. Returns and Refunds</Text>
        <Text style={styles.paragraph}>
          Returns and refunds are subject to our return policy, which can be
          found on the App or our website. You agree to comply with our return
          policy for any returns or refund requests.
        </Text>
        <Text style={styles.subtitle}>8. Disclaimer</Text>
        <Text style={styles.paragraph}>
          The information provided on the App is for general informational
          purposes only. Hydro Connect does not warrant the accuracy,
          completeness, or reliability of any information on the App.
        </Text>
        <Text style={styles.subtitle}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Hydro Connect shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages arising out of or in
          connection with your use of the App or Services.
        </Text>
        <Text style={styles.subtitle}>10. Governing Law</Text>
        <Text style={styles.paragraph}>
          These Terms shall be governed by and construed in accordance with
          the laws of Pakistan, without regard to its conflict of law
          provisions.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#708090',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#a9a9a9',
  },
});

export default TermsAndConditionsPage;
