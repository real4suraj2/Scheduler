import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";

const MainStack = createStackNavigator();

const MainStackScreens = ({ navigation }) => {
	return (
		<MainStack.Navigator initialRouteName="Welcome">
			<MainStack.Screen name="Welcome" options={{ headerShown: false }}>
				{(props) => <Welcome {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="Login" options={{ headerShown: false }}>
				{(props) => <Login {...props} />}
			</MainStack.Screen>
			<MainStack.Screen name="Dashboard" options={{ headerShown: false }}>
				{(props) => <Dashboard {...props} />}
			</MainStack.Screen>
		</MainStack.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer>
			<MainStackScreens />
		</NavigationContainer>
	);
};
