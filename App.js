import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigaiton/RootNavigation"
import { ThemeProvider, useTheme } from "./src/component/DarkTheme";
import { ToastProvider } from "react-native-toast-notifications";
import store from "./src/component/cart/cart_store";
import { Provider } from "react-redux";
import { SignInContextProvider } from "./src/navigaiton/Contexts/AuthContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SP_KEY } from '@env';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : colors.theme}
      />
      <RootNavigator />
    </View>
  );
};

export default function App() {
  return (
    <StripeProvider
      publishableKey={SP_KEY}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <SignInContextProvider>
        <Provider store={store}>
          <ToastProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </ToastProvider>
        </Provider>
      </SignInContextProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
