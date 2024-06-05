import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authnavigation";
import { ThemeProvider } from "../component/DarkTheme";

export default function RootNavigator() {
    return (
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        
    )
}