import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome_Screen from '../screens/Welcome';
import TermsAndConditionsPage from "../screens/auth_Screen/TermCond";


const Demo = createNativeStackNavigator();

export default function DemoStack() {
    return (
        <Demo.Navigator>
            <Demo.Screen
                name="App"
                component={TermsAndConditionsPage}
                options={{ headerShown: false }}
            />
        </Demo.Navigator>
    )
}
