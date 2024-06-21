import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drawer_Navigator from "./Drawer_Navigator";
import Product_Details from "../screens/ProductDetails";
import CatagoryProduct from "../screens/CatagoryProduct";
import Handle_Cart from "../screens/handleCart";
import Checkout_Screen from "../screens/Checkout";

const App = createNativeStackNavigator();

export default function AppStack() {
    return (
        <App.Navigator>
            <App.Screen
                name="App"
                component={Drawer_Navigator}
                options={{ headerShown: false }}
            />
            <App.Screen
                name="ProductDetials"
                component={Product_Details}
                options={{ headerShown: false }}
            />
            <App.Screen
                name="Catagory Product"
                component={CatagoryProduct}
                options={{ headerShown: false }}
            />
            <App.Screen
                name="Handle_Cart"
                component={Handle_Cart}
                options={{ headerShown: false }}
            />
            <App.Screen
                name="Checkout_Screen"
                component={Checkout_Screen}
                options={{ headerShown: false }}
            />
        </App.Navigator>
    )
}