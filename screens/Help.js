//Native Library Imports
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
} from "react-native";

//Components
import Feedback from "../components/Feedback";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [showFeedback, setShowFeedback] = useState(false);
	return (
		<View style={{ ...styles.container }}>
			<View
				style={{
					flex: 0.4,
					alignItems: "center",
				}}
			>
				<Image
					source={require("../assets/images/icon.jpg")}
					resizeMode="contain"
					style={{ ...styles.image }}
				/>
			</View>
			<View style={{ ...styles.container, flex: 0.6 }}>
				<TouchableOpacity
					onPress={() => {}}
					style={{ ...styles.mainButton }}
				>
					<Text style={{ ...styles.mainHeading }}>
						How to use Suvidha ?
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {}}
					style={{ ...styles.mainButton }}
				>
					<Text style={{ ...styles.mainHeading }}>Why Suvidha ?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {}}
					style={{ ...styles.mainButton }}
				>
					<Text style={{ ...styles.mainHeading }}>FAQs</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setShowFeedback(true)}
					style={{ ...styles.mainButton }}
				>
					<Text style={{ ...styles.mainHeading }}>Feedback</Text>
				</TouchableOpacity>
			</View>
			<Feedback
				showFeedback={showFeedback}
				setShowFeedback={setShowFeedback}
			/>
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
	mainHeading: {
		fontSize: 24,
		fontWeight: "500",
		textAlign: "center",
	},
	mainButton: {
		width: width * 0.85,
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 6,
		marginBottom: 16,
		borderWidth: StyleSheet.hairlineWidth,
	},
	image: {
		width: width * 0.85,
	},
});
