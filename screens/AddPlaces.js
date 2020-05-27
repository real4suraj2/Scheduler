//Native Library Imports
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Alert,
	Clipboard,
} from "react-native";

//Picker Library
import { Picker } from "@react-native-community/picker";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";

//Constants
import { db } from "../constants/firebase-config";

//Helpers
import uuidv4 from "../helpers/uuidv4";
import { TIMESTAMPS, buildTimeIntervals } from "../helpers/timestamps";

//Components
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [range, setRange] = useState(0);
	const [opening, setOpening] = useState(0);
	const [closing, setClosing] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		if (
			name == "" ||
			address == "" ||
			range == "" ||
			range > 100 ||
			opening == 0 ||
			closing == 0
		) {
			setLoading(false);
			return Alert.alert(
				"Invalid data",
				"Please check the data for all the fields",
				[{ text: "OK", onPress: () => {} }],
				{ cancelable: false }
			);
		}
		const start = Number(opening.slice(0, 2));
		const end =
			Number(closing.slice(0, 2)) == 0 ? 24 : Number(closing.slice(0, 2));
		if (start >= end) {
			setLoading(false);
			return Alert.alert(
				"Invalid Range",
				"Please provid valid range for working hours.",
				[{ text: "OK", onPress: () => {} }],
				{ cancelable: false }
			);
		}
		const uuid = uuidv4();
		const intervals = buildTimeIntervals();
		for (let i = start; i < end; ++i) {
			const pref =
				String(i).length != 2
					? "0" + String(i) + ":00-"
					: String(i) + ":00-";
			let suff =
				String(i + 1).length != 2
					? "0" + String(i + 1) + ":00"
					: String(i + 1) + ":00";
			if (i + 1 == 24) suff = "00:00";
			const interval = pref + suff;
			intervals[interval] = 0;
		}

		await db.ref("places/" + uuid).set({
			name,
			address,
			range,
		});

		await db.ref("intervals/" + uuid).set({
			...intervals,
		});

		setLoading(false);
		Alert.alert(
			"Successful",
			`Please write down the UUID for password generation\nUID: ${uuid}`,
			[
				{ text: "OK", onPress: () => navigation.push("Home") },
				{ text: "Copy", onPress: () => Clipboard.setString(uuid) },
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={{ ...styles.container }}>
			<View style={{ ...styles.inputContainer }}>
				<FontAwesome5 name="place-of-worship" size={24} color="gray" />
				<TextInput
					value={name}
					style={{ ...styles.input }}
					placeholder="Enter Place Name"
					onChangeText={(text) => setName(text)}
				/>
			</View>
			<View style={{ ...styles.inputContainer }}>
				<FontAwesome5 name="address-card" size={24} color="gray" />
				<TextInput
					value={address}
					style={{ ...styles.input }}
					placeholder="Enter Address"
					multiline={true}
					onChangeText={(text) => setAddress(text)}
				/>
			</View>
			<View style={{ ...styles.inputContainer }}>
				<FontAwesome5 name="layer-group" size={24} color="gray" />
				<TextInput
					value={range}
					style={{ ...styles.input }}
					placeholder="Permissible Allowance / Hr (max 100)"
					keyboardType="number-pad"
					onChangeText={(text) => setRange(Number(text))}
				/>
			</View>
			<Text style={{ marginTop: 12, fontSize: 18 }}>Working Hours </Text>
			<View style={{ ...styles.inputContainer }}>
				<FontAwesome5 name="clock" size={24} color="gray" />
				<Picker
					selectedValue={opening}
					style={{
						height: 50,
						width: width * 0.3,
					}}
					onValueChange={(item, index) => setOpening(item)}
				>
					{TIMESTAMPS.map((time) => (
						<Picker.Item label={time} value={time} />
					))}
				</Picker>

				<FontAwesome5 name="minus" size={24} color="gray" />
				<Picker
					selectedValue={closing}
					style={{
						height: 50,
						width: width * 0.3,
					}}
					onValueChange={(item, index) => setClosing(item)}
				>
					{TIMESTAMPS.map((time) => (
						<Picker.Item label={time} value={time} />
					))}
				</Picker>
			</View>
			<View style={{ ...styles.mainButton, marginTop: 16 }}>
				<TouchableOpacity onPress={async () => await handleSubmit()}>
					<Text style={{ ...styles.button }}> Add Place </Text>
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
	inputContainer: {
		flexDirection: "row",
		width: width * 0.85,
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	input: {
		width: width * 0.75,
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	button: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: "#fff",
	},
	mainButton: {
		width: width * 0.85,
		paddingVertical: 6,
		paddingHorizontal: 16,
		borderRadius: 6,
		backgroundColor: "#85144b",
	},
});
