//Native Library Imports
import React from "react";
import { View, Text } from "react-native";

//React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Icons
import { AntDesign } from "@expo/vector-icons";

//Screens
import Welcome from "../screens/Welcome";
import Login from "../screens/Login"; //Obsolete
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";

//Navigators
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const MainStackScreens = ({ navigation }) => {
	return (
		<MainStack.Navigator initialRouteName="Home">
			<MainStack.Screen name="Welcome" options={{ headerShown: false }}>
				{(props) => <Welcome {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="Login" options={{ headerShown: false }}>
				{(props) => <Login {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="Home" options={{ headerShown: false }}>
				{(props) => <TabScreens {...props} />}
			</MainStack.Screen>
		</MainStack.Navigator>
	);
};

const TabScreens = ({ navigation }) => {
	return (
		<Tabs.Navigator
			initialRouteName="Profile"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					switch (route.name) {
						case "Dashboard":
							iconName = "dashboard";
							break;
						case "Profile":
							iconName = "user";
							break;
						default:
							break;
					}
					return (
						<AntDesign name={iconName} size={size} color={color} />
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: "#F012BE",
				inactiveTintColor: "#AAAAAA",
			}}
		>
			<Tabs.Screen name="Dashboard" component={Dashboard} />
			<Tabs.Screen name="Profile" component={Profile} />
		</Tabs.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer>
			<MainStackScreens />
		</NavigationContainer>
	);
};
