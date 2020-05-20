//Native Library Imports
import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	AsyncStorage,
	Dimensions,
	Image,
	Alert,
} from "react-native";

//Components
import Loading from "../components/Loading";

//Helpers
import cleanupDriver from "../helpers/cleanupDriver";

//Constants
import { EMAIL_IDS } from "../constants/admin-emails";
import { db } from "../constants/firebase-config";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({
		name: "Username",
		photoUri: null,
		email: "user@example.com",
		signIn: "Google",
	});
	useEffect(() => {
		const _setData = async () => {
			const id = await AsyncStorage.getItem("id");
			const token = await AsyncStorage.getItem("token");

			//TODO token verification
			await db
				.ref("users")
				.child(id)
				.once(
					"value",
					(snapshot) => {
						const {
							name,
							photoUri,
							email,
							method,
						} = snapshot.val();

						setUser({
							name,
							photoUri,
							email,
							method,
						});
						setLoading(false);
					},
					(err) => {
						console.log("Error");
						setLoading(false);
					}
				);
		};
		_setData();
	}, []);

	return (
		<View style={{ ...styles.container }}>
			<View
				style={{
					flex: 0.4,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{user.photoUri == null ? (
					<Image
						source={require("../assets/images/avatar.png")}
						style={{ ...styles.avatar }}
					/>
				) : (
					<Image
						source={{ uri: user.photoUri }}
						style={{ ...styles.avatar }}
					/>
				)}
				<Text style={{ ...styles.mainHeading }}>Hi {user.name}</Text>
				{EMAIL_IDS.find((id) => id == user.email) == user.email && (
					<TouchableOpacity
						style={{
							...styles.logoutContainer,
							backgroundColor: "#7FDBFF",
							marginTop: 12,
						}}
						onPress={() => navigation.push("AddPlaces")}
					>
						<Text style={{ ...styles.logout }}>Add Places</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={{ flex: 0.4, justifyContent: "center" }}>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={{ ...styles.label }}>Email :</Text>
					<Text style={{ ...styles.text }}>{user.email}</Text>
				</View>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={{ ...styles.label }}>SignIn Method :</Text>
					<Text style={{ ...styles.text }}>{user.method}</Text>
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
								{
									text: "Logout",
									onPress: async () => {
										setLoading(true);
										await cleanupDriver();
										setLoading(false);
									},
								},
							],
							{ cancelable: false }
						);
					}}
				>
					<Text style={{ ...styles.logout }}>Logout</Text>
				</TouchableOpacity>
			</View>
			{loading && <Loading />}
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
	mainHeading: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 12,
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
