import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default ({ navigation }) => {
	return (
		<View style={{ ...styles.container }}>
			<Text> Login </Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
