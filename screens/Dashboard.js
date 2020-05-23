//Native Library Imports
import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
	AsyncStorage,
} from "react-native";

//Constant
import { db } from "../constants/firebase-config";

//Components
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [id, setId] = useState("");
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const _retreiveData = async () => {
			const userId = await AsyncStorage.getItem("id");
			setId(userId);
		};
		_retreiveData();
	});
	useEffect(() => {
		if (id == "") return;
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
								setLoading(false);
							} else {
								setLoading(false);
								db.ref("places")
									.child(place)
									.once(
										"value",
										(snapshot) => {
											const info = snapshot.val();
											setData({
												slot,
												expiresAt,
												place,
												info,
												id,
											});
											clearInterval(interval);
										},
										(error) => {}
									);
							}
						} else if (val == null) {
							setLoading(false);
						}
					},
					(error) => setLoading(false)
				)
				.catch((err) => setLoading(false));
		}, 1000);
		return () => clearInterval(interval);
	}, [id]);
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
					style={{ ...styles.mainButton, marginTop: 12 }}
					onPress={() => navigation.navigate("Slot", { ...data })}
				>
					<Text
						style={{
							...styles.mainHeading,
							fontSize: 18,
							color: "#000",
						}}
					>
						My E-Pass
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.mainButton, marginTop: 12 }}
					onPress={() => navigation.navigate("ScheduleVisit")}
				>
					<Text
						style={{
							...styles.mainHeading,
							fontSize: 18,
							color: "#000",
						}}
					>
						Schedule Visit
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.mainButton, marginTop: 12 }}
					onPress={() => {}}
				>
					<Text
						style={{
							...styles.mainHeading,
							fontSize: 18,
							color: "#000",
						}}
					>
						Past Visits
					</Text>
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
	mainButton: {
		width: width * 0.85,
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 6,
		marginBottom: 12,
		borderWidth: StyleSheet.hairlineWidth,
	},
	mainHeading: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
	},
	image: {
		width: width * 0.85,
	},
});
