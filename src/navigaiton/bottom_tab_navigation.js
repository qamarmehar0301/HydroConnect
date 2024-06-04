import React from "react";
import { colors } from "../global/styles";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home_Screen from "../screens/bottom_Screens/Home_Screen";
import Search_Screen from "../screens/bottom_Screens/Search_Screen";
import Order_Screen from "../screens/bottom_Screens/Order_Screen";
import Account_Screen from "../screens/bottom_Screens/Account_Screen";

const Bottom = createBottomTabNavigator();

export default function Bottom_Tab_Nagvigator() {
    return (
        <Bottom.Navigator tabBarOptions={{ activeTintColor: colors.theme }}>
            <Bottom.Screen
                name="Home_Screen"
                component={Home_Screen}
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
            <Bottom.Screen
                name="Search_Screen"
                component={Search_Screen}
                options={{
                    tabBarLabel: 'Search ',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="search"
                            type="material"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Bottom.Screen
                name="My_Order"
                component={Order_Screen}
                options={{
                    tabBarLabel: 'Order ',
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
            <Bottom.Screen
                name="Account_Screen"
                component={Account_Screen}
                options={{
                    tabBarLabel: 'Account ',
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
        </Bottom.Navigator>
    )
}