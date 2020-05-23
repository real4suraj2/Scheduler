//Native LIbrary Imports
import React, { useState } from "react";
import {
	Text,
	View,
	Modal,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Alert,
	AsyncStorage,
} from "react-native";

//Icons
import { MaterialIcons } from "@expo/vector-icons";

//Constants
import { db } from "../constants/firebase-config";

//Components
import Loading from "./Loading";

const { width, height } = Dimensions.get("window");

export default ({ showFeedback, setShowFeedback }) => {
	const [feedback, setFeedback] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFeedback = async () => {
		setLoading(true);
		const id = await AsyncStorage.getItem("id");
		const date =
			" : " +
			String(new Date().toDateString()) +
			String(new Date().toLocaleTimeString());
		await db
			.ref("feedbacks")
			.child(id + date)
			.set({ feedback });
		Alert.alert(
			"Feedback Sent",
			"Thank you for providing feedback to us.",
			[
				{
					text: "OK",
					onPress: () => {
						setLoading(false);
					},
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<Modal
			visible={showFeedback}
			onRequestClose={() => setShowFeedback(false)}
			animationType="slide"
		>
			<View style={{ ...styles.container }}>
				<View style={{ marginBottom: 32 }}>
					<MaterialIcons name="feedback" size={64} color="gray" />
				</View>
				<View style={{ ...styles.inputContainer }}>
					<MaterialIcons name="feedback" size={24} color="gray" />
					<TextInput
						value={feedback}
						onChangeText={(text) => setFeedback(text)}
						placeholder="Your Feedback is valuable to us."
						multiline={true}
						style={{ ...styles.input }}
					/>
				</View>
				<TouchableOpacity
					onPress={async () => await handleFeedback()}
					style={{
						...styles.mainButton,
						backgroundColor: "#001f3f",
						marginTop: 24,
					}}
				>
					<Text
						style={{
							...styles.mainHeading,
							fontSize: 18,
							color: "#fff",
						}}
					>
						Send Feedback
					</Text>
				</TouchableOpacity>
			</View>
			{loading && <Loading />}
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inputContainer: {
		flexDirection: "row",
		width: width * 0.85,
		justifyContent: "space-between",
		alignItems: "center",
	},
	input: {
		width: width * 0.75,
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	mainButton: {
		width: width * 0.85,
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 6,
		marginBottom: 12,
	},
	mainHeading: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
	},
});
