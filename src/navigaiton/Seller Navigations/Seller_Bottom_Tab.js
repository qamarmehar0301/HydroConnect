import React from "react";
import { colors } from "../../global/styles";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Seller_Home from "../../screens/Seller/Bottom_Tab_Screen/Seller_Home";
import My_Product_Screen from "../../screens/Seller/Bottom_Tab_Screen/My_Products";
import Add_Product from "../../screens/Seller/Bottom_Tab_Screen/Add_Product";
import Seller_Account from "../../screens/Seller/Bottom_Tab_Screen/Seller_Account";

const Seller_Bottom = createBottomTabNavigator();

export default function Seller_Bottom_Tab_Navigator() {
    return (
        <Seller_Bottom.Navigator tabBarOptions={{ activeTintColor: colors.theme }} >
            <Seller_Bottom.Screen
                name="Seller_Home"
                component={Seller_Home}
                options={{
                    tabBarLabel: 'Home ',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="home"
                            type="material"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Seller_Bottom.Screen
                name="My_Product_Screen"
                component={My_Product_Screen}
                options={{
                    tabBarLabel: 'My Product ',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="view-list"
                            type="material"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Seller_Bottom.Screen
                name="Add_Product"
                component={Add_Product}
                options={{
                    tabBarLabel: 'Add Product ',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="add-circle"
                            type="material"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Seller_Bottom.Screen
                name="Seller_Account"
                component={Seller_Account}
                options={{
                    tabBarLabel: 'My Profile ',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="person"
                            type="material"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

        </Seller_Bottom.Navigator>
    )
}