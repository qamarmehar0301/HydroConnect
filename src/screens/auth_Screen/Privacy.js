import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../component/Header";
import { useTheme } from "../../component/DarkTheme";

const PrivacyPage = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : 'white' }}>
      <Header title="Privacy" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Hydro Connect operates the Hydro Connect mobile application. This page informs you of our policies regarding
          the collection, use, and disclosure of personal data when you use our App and the choices you have associated
          with that data.
        </Text>
        <Text style={styles.subtitle}>1. Information Collection and Use</Text>
          <Text style={styles.paragraph}>
            We collect several different types of information for various purposes to
            provide and improve our App to you.
          </Text>
          <Text style={styles.subtitle}>2. Types of Data Collected</Text>
          <Text style={styles.paragraph}>
            Personal Data: While using our App, we may ask you to provide us with
            certain personally identifiable information that can be used to contact
            or identify you.
            Usage Data: We may also collect information on how the App is accessed
            and used.
            Tracking & Cookies Data: We use cookies and similar tracking technologies
            to track the activity on our App and hold certain information.
          </Text>
          <Text style={styles.subtitle}>3. Use of Data</Text>
          <Text style={styles.paragraph}>
            We use the collected data for various purposes, including to provide and
            maintain the App, to notify you about changes to our App, and to allow
            you to participate in interactive features of our App when you choose to
            do so.
          </Text>
          <Text style={styles.subtitle}>4. Disclosure of Data</Text>
          <Text style={styles.paragraph}>
            We may disclose your Personal Data if required to do so by law or in
            response to valid requests by public authorities (e.g., a court or a
            government agency).
          </Text>
          <Text style={styles.subtitle}>5. Security of Data</Text>
          <Text style={styles.paragraph}>
            The security of your data is important to us, but remember that no method
            of transmission over the Internet, or method of electronic storage is 100%
            secure.
          </Text>
          <Text style={styles.subtitle}>6. Changes to This Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We may update our Privacy Policy from time to time. You are advised to
            review this Privacy Policy periodically for any changes.
          </Text>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#708090',
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

export default PrivacyPage;
