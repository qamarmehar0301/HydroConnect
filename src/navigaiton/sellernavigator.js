import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Seller_Home from '../screens/Seller/Seller_Home';


const Seller = createNativeStackNavigator();

export default function SellerStack() {
    return (
        <Seller.Navigator>
            <Seller.Screen
                name="App"
                component={Seller_Home}
                options={{ headerShown: false }}
            />
        </Seller.Navigator>
    )
}
