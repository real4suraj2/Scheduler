//Native Library Imports
import React, { useState, useLayoutEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";

//Icons
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [aadhar, setAadhar] = useState("");
	const [aarogyaSetu, setAarogyaSetu] = useState("");
	const [registeredId, setRegisteredId] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => null,
		});
	}, [navigation]);

	return (
		<View style={{ ...styles.container, marginTop: 12 }}>
			<View style={{ flex: 0.4 }}>
				<Image
					source={require("../assets/images/icon.jpg")}
					style={{ ...styles.image }}
				/>
			</View>
			<View style={{ flex: 0.5, marginTop: 24 }}>
				<View style={{ ...styles.inputContainer }}>
					<AntDesign name="creditcard" size={24} color="gray" />
					<TextInput
						value={aadhar}
						onChangeText={(text) => setAadhar(text)}
						style={{ ...styles.input }}
						placeholder="Enter Aadhar Id"
					/>
				</View>
				<View style={{ ...styles.inputContainer }}>
					<AntDesign name="layout" size={24} color="gray" />
					<TextInput
						value={aarogyaSetu}
						onChangeText={(text) => setAarogyaSetu(text)}
						style={{ ...styles.input }}
						placeholder="Enter Aarogya Setu Id"
					/>
				</View>
				<View style={{ ...styles.inputContainer }}>
					<AntDesign name="lock" size={24} color="gray" />
					<TextInput
						value={registeredId}
						onChangeText={(text) => setRegisteredId(text)}
						style={{ ...styles.input }}
						placeholder="Enter Registered Id"
					/>
				</View>
				<TouchableOpacity
					onPress={() =>
						Alert.alert(
							"Login Successful",
							"Welcome to Suvidha",
							[{ text: "OK", onPress: () => {} }],
							{ cancelable: false }
						)
					}
					style={{ ...styles.buttonContainer }}
				>
					<Text style={{ ...styles.button }}>Verify</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 0.1, justifyContent: "flex-end" }}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Welcome")}
					style={{ ...styles.backButtonContainer }}
				>
					<Text style={{ ...styles.backButton }}>
						Take me to Home
					</Text>
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
	inputContainer: {
		flexDirection: "row",
		width: width * 0.85,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 24,
	},
	input: {
		width: width * 0.75,
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingLeft: 12,
		marginLeft: 6,
	},
	image: {
		width: width,
		height: 250,
	},
	buttonContainer: {
		width: width * 0.85,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		backgroundColor: "#B10DC9",
		marginTop: 12,
	},
	button: {
		textAlign: "center",
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	backButtonContainer: {
		width: width,
		marginBottom: 12,
	},
	backButton: {
		color: "#AAAAAA",
		textAlign: "center",
		textDecorationLine: "underline",
	},
});
