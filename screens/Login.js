import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

//Components
import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const handleAuth = (type) => {};

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
