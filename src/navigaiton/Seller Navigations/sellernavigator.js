import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Seller_Bottom_Tab_Navigator from "./Seller_Bottom_Tab";
import S_Product_Details from "../../screens/Seller/S_ProductDetails";
import Edit_Product_Screen from "../../screens/Seller/Edit_Product";


const Seller = createNativeStackNavigator();

export default function SellerStack() {
    return (
        <Seller.Navigator>
            <Seller.Screen
                name="App"
                component={Seller_Bottom_Tab_Navigator}
                options={{ headerShown: false }}
            />
            <Seller.Screen
                name="S_Product_Details"
                component={S_Product_Details}
                options={{ headerShown: false }}
            />
             <Seller.Screen
                name="Edit_Product_Screen"
                component={Edit_Product_Screen}
                options={{ headerShown: false }}
            />
        </Seller.Navigator>
    )
}
