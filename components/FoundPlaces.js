//Native Library Imports
import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native";

//Expo Deep Linking
import * as Linking from "expo-linking";

//Icons
import { Feather } from "@expo/vector-icons";

//Constants
import { db } from "../constants/firebase-config";

//Components
import Schedule from "../components/Schedule";

const { width, height } = Dimensions.get("window");

export default ({ search, all, setLoading, showSchedule, setShowSchedule }) => {
	const [places, setPlaces] = useState([]);
	const [json, setJson] = useState({});
	const [searchResult, setSearchResult] = useState([]);
	const [id, setId] = useState("");
	const [range, setRange] = useState("");

	useEffect(() => {
		//TODO : Firebase Integration ---------> DONE
		//TODO : Search Optimization

		//----------Mock Data----------//
		// const json = [
		// 	"Mall A",
		// 	"Mall B",
		// 	"Mall C",
		// 	"Mall D",
		// 	"Shop A",
		// 	"Shop B",
		// 	"Shop C",
		// 	"Shop D",
		// 	"Location X",
		// 	"Location Y",
		// 	"Location Z",
		// ];
		//--------------------------//
		const _retreiveData = async () => {
			setLoading(true);
			await db.ref("places").once(
				"value",
				(snapshot) => {
					const val = snapshot.val();
					setPlaces(Object.keys(val));
					setJson(val);
				},
				(error) => {
					console.log("Error!");
				}
			);
			setLoading(false);
		};
		_retreiveData();

		//setPlaces(json.slice());
	}, []);

	useEffect(() => {
		const filteredResult = places.filter(
			(el) => json[el].name.toLowerCase().search(search) != -1
		);
		setSearchResult([...filteredResult]);
	}, [search]);
	return (
		<View>
			<Text style={{ ...styles.mainHeading }}>
				{all ? "Places" : "Search Results"}
			</Text>
			<FlatList
				keyExtractor={(item, index) => `${index}`}
				data={all ? places : searchResult}
				renderItem={({ item, index }) => {
					return (
						<View style={{ ...styles.itemContainer }}>
							<Text> {json[item].name} </Text>
							<View style={{ flexDirection: "row" }}>
								<TouchableOpacity
									onPress={() => {
										Alert.alert(
											json[item].name,
											`Address: ${json[item].address}\n\nPermissible Allowance Per Hour: ${json[item].range}`,
											[
												{
													text: "OK",
													onPress: () => {},
												},
												{
													text: "Show in Map",
													onPress: () =>
														Linking.openURL(
															"https://www.google.com/maps/search/?api=1&query=" +
																encodeURIComponent(
																	json[item]
																		.address
																)
														),
												},
											],
											{ cancelable: true }
										);
									}}
									style={{ marginRight: 12 }}
								>
									<Feather
										name="info"
										size={32}
										color="blue"
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										setId(item);
										setRange(json[item].range);
										setShowSchedule(true);
									}}
								>
									<Feather
										name="arrow-right"
										size={32}
										color="#01FF70"
									/>
								</TouchableOpacity>
							</View>
						</View>
					);
				}}
			/>
			{showSchedule && (
				<Schedule
					showSchedule={showSchedule}
					setShowSchedule={setShowSchedule}
					id={id}
					range={range}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	mainHeading: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 12,
	},
	itemContainer: {
		width: width * 0.85,
		borderWidth: StyleSheet.hairlineWidth,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 6,
		marginBottom: 12,
		marginTop: 6,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
