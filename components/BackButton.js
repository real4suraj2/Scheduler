import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default ({ navigation, direction, color }) => {
	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				paddingTop: 24,
				...direction,
			}}
		>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{ width: 30, height: 30 }}
			>
				<Ionicons name="ios-arrow-back" size={32} color={color} />
			</TouchableOpacity>
		</View>
	);
};
