//Native Library Imports
import React, { useCallback, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native";

//Icons
import { FontAwesome } from "@expo/vector-icons";

//Social Imports
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

//Components
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";

//Configs
import { FACEBOOK_APP_ID, GOOGLE_ANDROID_ID } from "../constants/social-config";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [loading, setLoading] = useState(false);

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
				Alert.alert(
					`Hi ${json.name}`,
					"Welcome to Scheduler",
					[
						{
							text: "OK",
							onPress: () => {},
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
				androidStandaloneAppClientId: "",
				scopes: ["profile", "email"],
			});
			setLoading(false);
			if (type === "success") {
				Alert.alert(
					`Hi ${user.name}`,
					"Welcome to Scheduler",
					[
						{
							text: "OK",
							onPress: () => {},
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
			<BackButton
				navigation={navigation}
				direction={{ left: 0, paddingLeft: 16 }}
				color={"black"}
			/>
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
							marginTop: 16,
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
			{loading && <Loading />}
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
