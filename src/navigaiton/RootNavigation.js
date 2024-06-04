import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authnavigation";

export default function RootNavigator () {
    return(
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    )
}