//Native Library Imports
import React, { useState, useLayoutEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Alert,
	Keyboard,
	FlatList,
	ScrollView,
} from "react-native";

//Icons
import { Feather } from "@expo/vector-icons";

//Constants
import { db } from "../constants/firebase-config";

//Components
import Loading from "../components/Loading";
import Scanner from "../components/Scanner";

const { width, height } = Dimensions.get("window");

//----------Mock Data-----------
// const data = {
// 	a: "11:00-12:00",
// 	b: "11:00-12:00",
// 	c: "11:00-12:00",
// 	d: "11:00-12:00",
// 	e: "11:00-12:00",
// 	f: "11:00-12:00",
// 	g: "11:00-12:00",
// 	h: "11:00-12:00",
// 	i: "11:00-12:00",
// };
//------------------------------

export default ({ navigation }) => {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState({});
	const [showLogin, setShowLogin] = useState(true);
	const [visitors, setVisitors] = useState({});
	const [showScanner, setShowScanner] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			tabBarVisible: !showLogin,
		});
	}, [navigation, showLogin]);

	const setData = async (id) => {
		await db
			.ref("merchants")
			.child(id)
			.on(
				"value",
				(snapshot) => {
					const val = snapshot.val();
					setVisitors(val);
				},
				(err) => console.log("Error")
			);
	};

	const updatePassword = async (info) => {
		await db
			.ref("places")
			.child(id)
			.set({
				...info,
				password,
			});
		Alert.alert(
			"Success",
			"Password updated successfully!",
			[
				{
					text: "OK",
					onPress: () => {
						setLoading(false);
						navigation.pop();
					},
				},
			],
			{ cancelable: false }
		);
	};

	const handleLogin = () => {
		setLoading(true);
		Keyboard.dismiss();
		if (id == "" || password == "") {
			return Alert.alert(
				"Error",
				"Please fill all the required fields",
				[{ text: "OK", onPress: () => setLoading(false) }],
				{ cancelable: true }
			);
		}
		db.ref("places").once(
			"value",
			(snapshot) => {
				const val = snapshot.val();
				if (val[id] != undefined) {
					const info = val[id];
					setDetails(info);
					setData(id);
					if (info.password == undefined) {
						Alert.alert(
							"One Time Setup",
							"Are you sure to set this as password for your login",
							[
								{
									text: "Proceed",
									onPress: async () =>
										await updatePassword(info),
								},
								{
									text: "Leave",
									onPress: () => {
										setLoading(false);
										navigation.pop();
									},
								},
							],
							{ cancelable: false }
						);
					} else {
						if (password != info.password) {
							Alert.alert(
								"Error",
								"Please check your login password",
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
						} else {
							Alert.alert(
								"Success",
								"Welcome To Scheduler",
								[
									{
										text: "OK",
										onPress: () => {
											setLoading(false);
											setShowLogin(false);
										},
									},
								],
								{ cancelable: false }
							);
						}
					}
				} else {
					return Alert.alert(
						"Error",
						"Please check your login credentials",
						[{ text: "OK", onPress: () => setLoading(false) }],
						{ cancelable: true }
					);
				}
			},
			(err) => console.log("Error")
		);
	};
	return (
		<View style={{ ...styles.container }}>
			{showLogin && (
				<View style={{ ...styles.container }}>
					<View style={{ ...styles.inputContainer }}>
						<Feather name="user" size={24} color="gray" />
						<TextInput
							value={id}
							onChangeText={(text) => setId(text)}
							placeholder="Enter UID"
							multiline={true}
							style={{ ...styles.input }}
						/>
					</View>
					<View style={{ ...styles.inputContainer, marginTop: 12 }}>
						<Feather name="key" size={24} color="gray" />
						<TextInput
							value={password}
							onChangeText={(text) => setPassword(text)}
							placeholder="Enter Password"
							style={{ ...styles.input }}
							secureTextEntry={true}
						/>
					</View>
					<TouchableOpacity
						onPress={() => handleLogin()}
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
							Login As Merchant
						</Text>
					</TouchableOpacity>
				</View>
			)}
			{!showLogin && (
				<ScrollView>
					<View style={{ ...styles.container }}>
						<View
							style={{
								flex: 0.4,
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									...styles.mainHeading,
									marginBottom: 12,
								}}
							>
								Info
							</Text>
							<Text style={{ ...styles.text }}>
								Name : {details.name}
							</Text>
							<Text style={{ ...styles.text }}>
								Address : {details.address}
							</Text>
							<Text style={{ ...styles.text, marginBottom: 12 }}>
								Permissible Allowance / Hr : {details.name}
							</Text>
							<TouchableOpacity
								onPress={() => setShowScanner(true)}
								style={{
									...styles.validateContainer,
								}}
							>
								<Text style={{ ...styles.text }}>
									Validate Customer{"  "}
								</Text>
								<Feather name="camera" size={32} color="#000" />
							</TouchableOpacity>
						</View>
						<View style={{ flex: 0.2, justifyContent: "center" }}>
							<Text style={{ ...styles.mainHeading }}>
								Visitors
							</Text>
						</View>
						<View
							style={{ flex: 0.4, justifyContent: "flex-start" }}
						>
							<FlatList
								keyExtractor={(item, index) => `${index}`}
								data={
									visitors == null
										? []
										: Object.keys(visitors)
								}
								renderItem={({ item, index }) => {
									if (visitors[item] == null) return null;
									return (
										<View
											style={{
												...styles.visitorContainer,
											}}
										>
											<Text
												style={{
													...styles.text,
													fontSize: 16,
													fontStyle: "italic",
												}}
											>
												{item}
											</Text>
											<Text
												style={{
													...styles.text,
													fontSize: 16,
												}}
											>
												{visitors[item]}
											</Text>
										</View>
									);
								}}
							/>
						</View>
						<Scanner
							showScanner={showScanner}
							setShowScanner={setShowScanner}
							visitors={visitors == null ? {} : visitors}
						/>
					</View>
				</ScrollView>
			)}
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
	text: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 12,
	},
	visitorContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: width * 0.85,
		flexWrap: "wrap",
		borderWidth: StyleSheet.hairlineWidth,
		paddingVertical: 8,
		paddingHorizontal: 12,
		marginTop: 12,
		borderRadius: 6,
	},
	validateContainer: {
		flexDirection: "row",
		marginTop: 12,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: StyleSheet.hairlineWidth,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
	},
});
