import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Bottom_Tab_Nagvigator from "./bottom_tab_navigation";
import DrawerContent from "../component/DrawerContent";
import { Icon } from "react-native-elements";
import PrivacyPage from "../screens/auth_Screen/Privacy";
import TermsAndConditionsPage from "../screens/auth_Screen/TermCond";
import { ThemeProvider } from "../component/DarkTheme";
import { colors } from "../global/styles";
import Profile_Screen from "../screens/auth_Screen/Profile";
import Login from "../screens/auth_Screen/Login";
import CatagoryProduct from '../screens/CatagoryProduct';
import Handle_Cart from "../screens/handleCart";

const Drawer = createDrawerNavigator();

export default function Drawer_Navigator() {

    return (

        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Bottom_Tab_Nagvigator"
                component={Bottom_Tab_Nagvigator}
                options={{
                    headerShown: false,
                    title: 'Home',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            type="material-community"
                            name="home"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}

                        />
                    ),
                    //drawerLabelStyle: {color: colors.grey3}
                }}
            />
            <Drawer.Screen
                name="Profile_Screen"
                component={Profile_Screen}
                options={{
                    headerShown: false,
                    title: 'Profile',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            type="material-community"
                            name="account"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}
                        />
                    ),
                    drawerLabelStyle: { color: colors.grey3 }
                }}
            />
            <Drawer.Screen
                name="Handle_Cart"
                component={Handle_Cart}
                options={{
                    headerShown: false,
                    title: 'My Cart',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            name="shopping-cart"
                                type="material"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}

                        />
                    ),
                    drawerLabelStyle: { color: colors.grey3 }
                }}
            />
            <Drawer.Screen
                name="Privacy"
                component={PrivacyPage}
                options={{
                    headerShown: false,
                    title: 'Privacy Policy',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            type="material-community"
                            name="security"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}

                        />
                    ),
                    drawerLabelStyle: { color: colors.grey3 }
                }}
            />
            <Drawer.Screen
                name="TermsAndConditionsPage"
                component={TermsAndConditionsPage}
                options={{
                    headerShown: false,
                    title: 'Terms & Conditions',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            type="material-community"
                            name="text-box-check-outline"
                            color={focussed ? '#7cc' : 'grey'}
                            size={size}

                        />
                    ),
                    drawerLabelStyle: { color: colors.grey3 }
                }}
            />
        </Drawer.Navigator>

    )
}