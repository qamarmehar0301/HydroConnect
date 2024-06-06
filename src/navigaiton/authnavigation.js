import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome_Screen from "../screens/Welcome";
import Login from "../screens/auth_Screen/Login";
import SignUp from "../screens/auth_Screen/SignUp";
import Privacy from "../screens/auth_Screen/Privacy";
import TermCondition from "../screens/auth_Screen/TermCond";
import Drawer_Navigator from "./Drawer_Navigator";
import Product_Details from "../screens/ProductDetails";
import CatagoryProduct from "../screens/CatagoryProduct";

const Auth = createNativeStackNavigator();

export default function AuthStack() {
    return (
       
            <Auth.Navigator>
                <Auth.Screen
                    name="Welcome_Screen"
                    component={Welcome_Screen}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="SignIn"
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="Privacy"
                    component={Privacy}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="Term & Conditions"
                    component={TermCondition}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="Drawer_Navigator"
                    component={Drawer_Navigator}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="ProductDetials"
                    component={Product_Details}
                    options={{
                        headerShown: false
                    }}
                />
                <Auth.Screen
                    name="Catagory Product"
                    component={CatagoryProduct}
                    options={{
                        headerShown: false
                    }}
                />
            </Auth.Navigator>
     
    )
}