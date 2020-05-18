import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Components
import TermsOfService from "../components/TermsOfService";

const { width, height } = Dimensions.get("window");
export default ({ navigation }) => {
	const [showTerms, setShowTerms] = useState(false);
	return (
		<View style={{ ...styles.container }}>
			<View style={{ flex: 0.3, marginTop: 32 }}>
				<Text
					style={{
						...styles.mainHeading,
					}}
				>
					Welcome at{" "}
				</Text>
				<Text
					style={{
						...styles.mainHeading,
						color: "#B10DC9",
					}}
				>
					Scheduler
				</Text>
				<Text
					style={{
						...styles.subHeading,
					}}
				>
					Scheduling made easier..
				</Text>
			</View>
			<View
				style={{
					flex: 0.5,
					justifyContent: "flex-start",
				}}
			>
				<Image
					source={require("../assets/tick.jpg")}
					resizeMode="contain"
					style={{ ...styles.mainImage }}
				/>
			</View>

			<View
				style={{
					flex: 0.2,
					justifyContent: "flex-end",
					marginBottom: 16,
				}}
			>
				<TouchableOpacity>
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={["#F012BE", "#85144b"]}
						style={{ ...styles.mainButton }}
					>
						<Text
							style={{
								...styles.mainHeading,
								fontSize: 18,
								color: "#fff",
							}}
						>
							Login
						</Text>
					</LinearGradient>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setShowTerms(true)}>
					<Text style={{ ...styles.subButton }}>
						Terms of service{" "}
					</Text>
				</TouchableOpacity>
			</View>
			<TermsOfService showTerms={showTerms} setShowTerms={setShowTerms} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	mainHeading: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
	},
	subHeading: {
		fontSize: 24,
		fontStyle: "italic",
		textAlign: "center",
	},
	mainImage: {
		width,
		height: 350,
	},
	mainButton: {
		width: width * 0.85,
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 6,
		marginBottom: 12,
	},
	subButton: {
		textDecorationLine: "underline",
		color: "gray",
		textAlign: "center",
	},
});
