//Native Library Imports
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

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
import AddPlaces from "../screens/AddPlaces";
import Slot from "../screens/Slot";
import Merchant from "../screens/Merchant";
import Help from "../screens/Help";
import MockLogin from "../screens/MockLogin";
import MerchantProfile from "../screens/MerchantProfile";
import ScheduleVisit from "../screens/ScheduleVisit";

//Navigators
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const MerchantTabs = createBottomTabNavigator();

const MainStackScreens = ({ navigation }) => {
	return (
		<MainStack.Navigator
			initialRouteName="Welcome"
			screenOptions={{
				title: "SUVIDHA",
				headerStyle: {
					backgroundColor: "#39CCCC",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold",
				},
				headerRight: () => (
					<TouchableOpacity
						onPress={() => alert("Mock Notifications")}
						style={{ marginRight: 12 }}
					>
						<AntDesign name="bells" size={24} color="#fff" />
					</TouchableOpacity>
				),
			}}
		>
			<MainStack.Screen name="Welcome" options={{ headerShown: false }}>
				{(props) => <Welcome {...props} />}
			</MainStack.Screen>
			{/*
			<MainStack.Screen name="Login" options={{ headerShown: false }}>
				{(props) => <Login {...props} />}
			</MainStack.Screen>
			*/}
			<MainStack.Screen name="Home">
				{(props) => <TabScreens {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="AddPlaces">
				{(props) => <AddPlaces {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="Slot">
				{(props) => <Slot {...props} />}
			</MainStack.Screen>
			{/*
			<MainStack.Screen name="Merchant" options={{ headerShown: false }}>
				{(props) => <Merchant {...props} />}
			</MainStack.Screen>	
			*/}
			<MainStack.Screen name="Merchant">
				{(props) => <TabScreensMerchant {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="MockLogin">
				{(props) => <MockLogin {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="ScheduleVisit">
				{(props) => <ScheduleVisit {...props} />}
			</MainStack.Screen>
		</MainStack.Navigator>
	);
};

const TabScreens = ({ navigation }) => {
	return (
		<Tabs.Navigator
			initialRouteName="Dashboard"
			lazy={false}
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
						case "Help":
							iconName = "infocirlce";
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
			<Tabs.Screen name="Help" component={Help} />
			<Tabs.Screen name="Profile" component={Profile} />
		</Tabs.Navigator>
	);
};

const TabScreensMerchant = ({ navigation }) => {
	return (
		<Tabs.Navigator
			initialRouteName="Dashboard"
			lazy={false}
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
						case "Help":
							iconName = "infocirlce";
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
			<Tabs.Screen name="Dashboard" component={Merchant} />
			<Tabs.Screen name="Help" component={Help} />
			<Tabs.Screen name="Profile" component={MerchantProfile} />
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
