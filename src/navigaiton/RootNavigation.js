import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authnavigation";
import AppStack from "./appnavigator";
import SellerStack from "./Seller Navigations/sellernavigator";
import DemoStack from "./demonavigator";
import { SignInContext } from "./Contexts/AuthContext";


export default function RootNavigator() {

    const { signedIn } = useContext(SignInContext)

    return (

        <NavigationContainer>
            {signedIn.userToken ? (
                signedIn.userToken === "seller-sign-in" ? (
                    <SellerStack />
                ) : signedIn.userToken === "logout" ? (
                    <DemoStack/>
                ) : (
                    <AppStack />
                )
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>

    )
}