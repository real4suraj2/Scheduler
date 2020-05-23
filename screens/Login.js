//Native Library Imports
import React, { useCallback } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	Alert,
	AsyncStorage,
} from "react-native";

//Icons
import { FontAwesome } from "@expo/vector-icons";

//Reanimated
import Animated, { Easing } from "react-native-reanimated";

//Social Imports
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

//Helpers
import navigationReset from '../helpers/navigationReset';

//Configs
import {
	FACEBOOK_APP_ID,
	GOOGLE_ANDROID_ID,
	GOOGLE_STANDALONE_APP_ID,
} from "../constants/social-config";

import { db } from "../constants/firebase-config";

const { width, height } = Dimensions.get("window");

export default ({ navigation, translateY, setLoading }) => {
	const handleAuth = useCallback(async (type) => {
		switch (type) {
			case "facebook":
				await handleFacebook();
				break;
			case "google":
				setLoading(true);
				await handleGoogle();
				break;
			default:
				break;
		}
	});

	const handleNavigate = async (id, token) => {
		const _setData = async () => {
			await AsyncStorage.setItem("id", id);
			await AsyncStorage.setItem("token", token);
		};
		await _setData();
		navigationReset(navigation, "Home");
		navigation.navigate("Home");
	};

	const saveData = async (name, method, email, id, photoUri) => {
		await db.ref("users/" + id).set({
			method,
			email,
			photoUri,
			name: name[0].toUpperCase() + name.slice(1),
		});
	};

	const handleFacebook = useCallback(async () => {
		try {
			await Facebook.initializeAsync(FACEBOOK_APP_ID);
			const {
				type,
				token,
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: ["public_profile", "email"],
			});
			if (type === "success") {
				const response = await fetch(
					`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
				);
				const json = await response.json();
				await saveData(
					json.name,
					"Facebook",
					json.email === undefined ? "Not Assigned" : json.email,
					json.id,
					json.picture.data.url
				);
				Alert.alert(
					`Hi ${json.name}`,
					"Welcome to Suvidha",
					[
						{
							text: "OK",
							onPress: async () =>
								await handleNavigate(json.id, token),
						},
					],
					{ cancelable: false }
				);
			} else {
			}
		} catch ({ message }) {
			console.log(message);
		}
	});

	const handleGoogle = useCallback(async () => {
		try {
			const { type, accessToken, user } = await Google.logInAsync({
				iosClientId: "",
				androidClientId: GOOGLE_ANDROID_ID,
				androidStandaloneAppClientId: GOOGLE_STANDALONE_APP_ID,
				scopes: ["profile", "email"],
			});
			await saveData(
				user.name,
				"Google",
				user.email,
				user.id,
				user.photoUrl
			);
			setLoading(false);
			if (type === "success") {
				Alert.alert(
					`Hi ${user.name}`,
					"Welcome to Suvidha",
					[
						{
							text: "OK",
							onPress: async () =>
								await handleNavigate(user.id, accessToken),
						},
					],
					{ cancelable: false }
				);
			} else {
			}
		} catch ({ message }) {
			setLoading(false);
			console.log(message);
		}
	});

	return (
		<View style={{ ...styles.container }}>
			<View style={{ marginBottom: 12 }}>
				<TouchableOpacity
					onPress={() => {
						Animated.timing(translateY, {
							toValue: 0,
							duration: 500,
							easing: Easing.linear,
						}).start();
					}}
				>
					<FontAwesome name="angle-down" size={32} color="#000" />
				</TouchableOpacity>
			</View>
			<View
				style={{
					...styles.socialContainer,
				}}
			>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => handleAuth("google")}
				>
					<View
						style={{
							...styles.socialButton,
							backgroundColor: "#DC4E41",
							marginBottom: 16,
						}}
					>
						<Text style={{ ...styles.text }}>
							Sign In with Google{"          "}
						</Text>
						<FontAwesome name="google" size={32} color={"white"} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => handleAuth("facebook")}
				>
					<View
						style={{
							...styles.socialButton,
							backgroundColor: "#3A5896",
						}}
					>
						<Text style={{ ...styles.text }}>
							Sign In with Facebook{"      "}
						</Text>
						<FontAwesome
							name="facebook"
							size={32}
							color={"white"}
						/>
					</View>
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
	},
	socialContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	socialButton: {
		flexDirection: "row",
		width: width * 0.8,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 32,
		paddingVertical: 12,
	},
	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 18,
	},
});
