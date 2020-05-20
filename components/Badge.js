//Native Library Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

export default ({ data }) => {
	const text =
		data != "nonWorkingHrs" && data != "timeout" && data != "fullCapacity"
			? data
			: null;

	if (text == null) return null;
	return <Text style={{ ...styles.text }}>{text}</Text>;
};

const styles = StyleSheet.create({
	text: {
		fontWeight: "bold",
		fontSize: 12,
	},
});
