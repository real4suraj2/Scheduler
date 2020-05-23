//Native Library Imports
import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Keyboard,
	Alert,
	AsyncStorage,
} from "react-native";

//Navigation Library
import { StackActions } from "@react-navigation/native";

//Icons
import { Feather } from "@expo/vector-icons";

//Constants
import { db } from "../constants/firebase-config";

//Components
import FoundPlaces from "../components/FoundPlaces";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [text, setText] = useState("");
	const [search, setSearch] = useState(null);
	const [all, showAll] = useState(false);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(null);
	const [showSchedule, setShowSchedule] = useState(false);

	useEffect(() => {
		const _retreiveData = async () => {
			const userId = await AsyncStorage.getItem("id");
			setId(userId);
		};
		_retreiveData();
	});

	useEffect(() => {
		const interval = setInterval(() => {
			db.ref("slots")
				.child(id)
				.once(
					"value",
					(snapshot) => {
						const val = snapshot.val();
						if (val != null && val.slot != null) {
							const { slot, expiresAt, place } = val;
							const currTime =
								new Date().getTime() + 5.5 * 3600 * 1000;
							if (currTime > expiresAt) {
								db.ref("slots").child(id).set({
									slot: null,
									expiresAt: null,
									place: null,
								});
							} else {
								setShowSchedule(false);
								setLoading(false);
								db.ref("places")
									.child(place)
									.once(
										"value",
										(snapshot) => {
											const info = snapshot.val();
											navigation.dispatch(
												StackActions.replace("Slot", {
													slot,
													expiresAt,
													place,
													info,
													id,
												})
											);
											clearInterval(interval);
										},
										(error) => {}
									);
							}
						} else if (val == null) {
						}
					},
					(error) => console.log("Error")
				)
				.catch((err) => {});
		}, 1000);
		return () => clearInterval(interval);
	}, [id]);

	return (
		<View style={{ ...styles.container }}>
			<View
				style={{ flex: 0.2, justifyContent: "flex-end", marginTop: 16 }}
			>
				<View style={{ ...styles.inputContainer }}>
					<Feather name="search" size={24} color="gray" />
					<TextInput
						value={text}
						style={{ ...styles.input }}
						placeholder="Enter Destination"
						onChangeText={(value) => {
							setText(value);
						}}
					/>
				</View>
				<TouchableOpacity
					style={{ ...styles.search }}
					onPress={() => {
						Keyboard.dismiss();
						showAll(false);
						const val = text.toLowerCase();
						if (val.length < 4) {
							Alert.alert(
								"Search Error",
								"Your searched string length should be greater or equal to 4",
								[{ text: "OK", onPress: () => {} }],
								{ cancelable: true }
							);
						} else {
							setSearch(val);
						}
						setText("");
					}}
				>
					<Text style={{ ...styles.searchText }}> Search </Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 0.7 }}>
				<FoundPlaces
					search={search}
					all={all}
					setLoading={setLoading}
					showSchedule={showSchedule}
					setShowSchedule={setShowSchedule}
				/>
			</View>
			<View style={{ flex: 0.1, justifyContent: "flex-end" }}>
				<TouchableOpacity
					style={{ ...styles.showAllContainer }}
					onPress={() => showAll(true)}
				>
					<Text style={{ ...styles.showAll }}>Show All</Text>
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
	search: {
		width: width * 0.85,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 6,
		marginTop: 16,
	},
	searchText: {
		textAlign: "center",
		fontWeight: "bold",
	},
	showAllContainer: {
		backgroundColor: "#39CCCC",
		width: width * 0.85,
		paddingVertical: 6,
		paddingHorizontal: 18,
		borderRadius: 6,
		marginBottom: 12,
	},
	showAll: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
	},
});
