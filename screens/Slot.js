//Native Library Imports
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Alert,
} from "react-native";
import { Updates } from "expo";

//Navigation Library
import { StackActions } from "@react-navigation/native";

//Linear Gradient
import { LinearGradient } from "expo-linear-gradient";

//Icons
import { AntDesign } from "@expo/vector-icons";

//Expo Deep Linking
import * as Linking from "expo-linking";

//Constants
import { db } from "../constants/firebase-config";

//Helpers
import navigationReset from "../helpers/navigationReset";
import cleanupDriver from "../helpers/cleanupDriver";

//Components
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default ({ navigation, route }) => {
	if (route.params == undefined || route.params.slot == undefined) {
		return (
			<View style={{ ...styles.container }}>
				<AntDesign name="creditcard" size={90} color="#000" />
				<Text style={{ ...styles.mainHeading, fontSize: 24 }}>
					You Haven't Occupied A Slot Yet
				</Text>
			</View>
		);
	}
	const { slot, expiresAt, place, info, id } = route.params;
	//-------------Mock Data----------------
	// const { slot, expiresAt, place, info } = {
	// 	slot: "abc",
	// 	expiresAt: 1233123231,
	// 	place: "xyz",
	// 	info: {
	// 		name: "efg",
	// 		address: "adfag",
	// 		range: 10,
	// 	},
	// };
	//--------------------------------------
	const [loading, setLoading] = useState(false);
	const [valid, setValid] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: "#F012BE",
			},
		});
	}, [navigation]);

	useEffect(() => {
		const interval = setInterval(() => {
			const date = new Date().getTime();
			setValid(date < new Date(expiresAt - 6.5 * 3600 * 1000).getTime());
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			colors={["#F012BE", "#85144b"]}
			style={{ ...styles.container }}
		>
			<View style={{ ...styles.container }}>
				<View
					style={{
						flex: 0.3,
						justifyContent: "flex-end",
					}}
				>
					<Image
						source={{
							uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`,
						}}
						style={{ ...styles.image }}
					/>
				</View>
				<View style={{ ...styles.container, flex: 0.6, marginTop: 32 }}>
					<Text style={{ ...styles.text, ...styles.mainHeading }}>
						Confirmation
					</Text>
					<Text style={{ ...styles.text }}>UID: {id}</Text>
					<Text style={{ ...styles.text }}>
						Your Occupied Slot: {slot}
					</Text>
					<Text style={{ ...styles.text }}>
						Location: {info.name}
					</Text>
					<Text style={{ ...styles.text }}>
						Address: {info.address}
					</Text>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								"https://www.google.com/maps/search/?api=1&query=" +
									encodeURIComponent(info.address)
							)
						}
						style={{ ...styles.mapsButtonContainer }}
					>
						<Text style={{ ...styles.mapsButton }}>
							Show in Maps
						</Text>
					</TouchableOpacity>
					<Text style={{ ...styles.text }}>
						Permissible Allowance/ Hr: {info.range}
					</Text>
					<Text style={{ ...styles.text }}>
						Expires At :{" "}
						{new Date(expiresAt - 5.5 * 3600 * 1000).toDateString()}{" "}
						{new Date(
							expiresAt - 5.5 * 3600 * 1000
						).toLocaleTimeString()}
					</Text>
					{valid && (
						<TouchableOpacity
							onPress={() => {
								Alert.alert(
									"Leave Slot",
									"Are you sure you want to leave this slot?",
									[
										{
											text: "Leave",
											onPress: async () => {
												setLoading(true);
												await db
													.ref("slots")
													.child(id)
													.set({
														slot: null,
														expiresAt: null,
														place: null,
													});
												await db
													.ref("intervals")
													.child(place)
													.child(slot)
													.once(
														"value",
														async (snapshot) => {
															let val = snapshot.val();
															if (
																val ==
																"fullCapacity"
															)
																val = Number(
																	info.range
																);
															const json = {};
															json[slot] =
																val - 1;
															await db
																.ref(
																	"intervals"
																)
																.child(place)
																.update(json);
															const json2 = {};
															json2[id] = null;
															await db
																.ref(
																	"merchants"
																)
																.child(place)
																.update({
																	...json2,
																});
														},
														(err) => {}
													);
												setLoading(false);
												navigation.dispatch(
													StackActions.replace("Home")
												);
											},
										},
										{ text: "Cancel", onPress: () => {} },
									],
									{ cancelable: false }
								);
							}}
							style={{
								...styles.logoutContainer,
								backgroundColor: "#7FDBFF",
							}}
						>
							<Text style={{ ...styles.logout }}>Leave Slot</Text>
						</TouchableOpacity>
					)}
				</View>
				<View
					style={{ ...styles.container, flex: 0.1, marginBotton: 12 }}
				>
					<TouchableOpacity
						style={{ ...styles.logoutContainer }}
						onPress={() =>
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
							)
						}
					>
						<Text style={{ ...styles.logout }}> Logout </Text>
					</TouchableOpacity>
				</View>
				{loading && <Loading />}
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		paddingVertical: 6,
		paddingHorizontal: 18,
		marginBottom: 12,
		color: "#fff",
		fontWeight: "bold",
		alignItems: "center",
	},
	mainHeading: {
		fontSize: 32,
		textAlign: "center",
		fontWeight: "bold",
	},
	image: {
		width: 150,
		height: 150,
	},
	logoutContainer: {
		backgroundColor: "#FF4136",
		width: width * 0.85,
		paddingVertical: 6,
		paddingHorizontal: 18,
		borderRadius: 6,
		marginBottom: 12,
	},
	logout: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
	},
	mapsButtonContainer: {
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: -2,
	},
	mapsButton: {
		textDecorationLine: "underline",
		color: "#fff",
	},
});
