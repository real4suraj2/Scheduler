//Native Library Imports
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
	Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	return (
		<View style={{ ...styles.container }}>
			<View style={{ flex: 0.4, justifyContent: "center" }}>
				<Image
					source={require("../assets/images/avatar.png")}
					style={{ ...styles.avatar }}
				/>
			</View>
			<View style={{ flex: 0.4, justifyContent: "center" }}>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={{ ...styles.label }}>Email :</Text>
					<Text style={{ ...styles.text }}>user@example.com</Text>
				</View>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={{ ...styles.label }}>SignIn Method :</Text>
					<Text style={{ ...styles.text }}>Google</Text>
				</View>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={{ ...styles.label }}>Date Of Birth :</Text>
					<Text style={{ ...styles.text }}>01/01/2020</Text>
				</View>
			</View>
			<View style={{ flex: 0.2, justifyContent: "flex-end" }}>
				<TouchableOpacity
					style={{ ...styles.logoutContainer }}
					onPress={() => {
						Alert.alert(
							"Logout",
							"Are you sure you want to logout ?",
							[
								{ text: "Cancel", onPress: () => {} },
								{ text: "Logout", onPress: () => {} },
							],
							{ cancelable: false }
						);
					}}
				>
					<Text style={{ ...styles.logout }}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	avatar: {
		width: 110,
		height: 110,
		borderRadius: 110,
	},
	logoutContainer: {
		backgroundColor: "#FF4136",
		width: width * 0.85,
		paddingVertical: 6,
		paddingHorizontal: 18,
		borderRadius: 6,
		marginBottom: 12,
	},
	logout: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
	},
	detailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: width * 0.85,
		marginBottom: 12,
	},
	label: {
		fontSize: 20,
		fontStyle: "italic",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
