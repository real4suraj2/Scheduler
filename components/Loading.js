//Native Library Imports
import React from "react";
import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default () => (
	<View style={{ ...styles.loadingContainer }}>
		<View
			style={{
				flex: 1,
				justifyContent: "center",
			}}
		>
			<ActivityIndicator size={64} color="#fff" />
		</View>
	</View>
);

const styles = StyleSheet.create({
	loadingContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width,
		height: height + 30,
		elevation: 7,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
});
