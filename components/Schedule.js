//Native Library Imports
import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	Modal,
	StyleSheet,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	Alert,
	AsyncStorage,
} from "react-native";

//Constants
import { db } from "../constants/firebase-config";

//Components
import Loading from "../components/Loading";
import Badge from "../components/Badge";

//Helpers
import getStartingTimeStamp from "../helpers/getStartingTimeStamp";
import getUpdatedJson from "../helpers/getUpdatedJson";
import { buildJson } from "../helpers/timestamps";

const { width, height } = Dimensions.get("window");

export default ({ showSchedule, setShowSchedule, id, range }) => {
	const [status, setStatus] = useState(buildJson(null));
	const [selected, setSelected] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [slot, setSlot] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//TODO : Firebase Integration ----> Done
		//-------Mock data-----------
		//---------------------------
		// setStatus(json);
		const _retreiveData = async () => {
			await db
				.ref("intervals")
				.child(id)
				.on(
					"value",
					(snapshot) => {
						const val = snapshot.val();
						setStatus((prev) => getUpdatedJson(buildJson(val)));
						setUpdated((prev) => !prev);
					},
					(error) => console.log("Error")
				);
		};
		//-----Debugging leaks------
		//console.log("Called 1");
		//--------------------------
		_retreiveData();
	}, []);

	useEffect(() => {
		//----Debugging leaks------
		//console.log("Called 2");
		//-------------------------
		const interval = setInterval(() => {
			const new_json = getUpdatedJson({ ...status });
			setStatus(new_json);
		}, 1000);
		return () => clearInterval(interval);
	}, [updated]);

	const handleSlot = (Slot) => {
		const stat = status[Slot].status;
		switch (stat) {
			case "timeout":
				Alert.alert(
					"Selection Error",
					"Current timing is past this interval",
					[
						{
							text: "OK",
							onPress: () => {},
						},
					],
					{ cancelable: true }
				);
				break;
			case "nonWorkingHrs":
				Alert.alert(
					"Selection Error",
					"Place is not visitble in these hrs",
					[
						{
							text: "OK",
							onPress: () => {},
						},
					],
					{ cancelable: true }
				);
				break;
			case "fullCapacity":
				Alert.alert(
					"Selection Error",
					"All slots have been occupied",
					[
						{
							text: "OK",
							onPress: () => {},
						},
					],
					{ cancelable: true }
				);
				break;
			default:
				setSelected(true);
				setSlot(Slot);
		}
	};

	const handleOccupySlot = async () => {
		setLoading(true);
		const val = slot;
		if (val == "") return setLoading(false);
		const stat = status[val].status;
		if (
			stat != "nonWorkingHrs" &&
			stat != "timeout" &&
			stat != "fullCapacity"
		) {
			const res = stat + 1 == range ? "fullCapacity" : stat + 1;
			let expiresAt = getStartingTimeStamp(val.slice(6, 8));
			if (val.slice(6, 8) == "00") expiresAt += 3600 * 24 * 1000;
			const json = {};
			json[val] = res;
			await db.ref("intervals").child(id).update(json);
			const userId = await AsyncStorage.getItem("id");
			console.log(userId);
			await db.ref(`slots/${userId}`).set({
				//await db.ref("slots/testId").set({
				slot: val,
				expiresAt,
				place: id,
			});
			const json2 = {};
			json2[userId] = val;
			await db.ref(`merchants/${id}`).update({ ...json2 });
			setLoading(false);
			setShowSchedule(false);
		} else {
			setLoading(false);
		}
	};

	return (
		<Modal
			visible={showSchedule}
			onRequestClose={() => setShowSchedule(false)}
			animationType="slide"
		>
			<View style={{ ...styles.container }}>
				<View style={{ flex: 0.2, justifyContent: "center" }}>
					<Text style={{ ...styles.mainHeading }}>
						Available Slots
					</Text>
					<Text style={{ ...styles.subHeading }}>
						Permissible Allowance / Hr : {range}
					</Text>
				</View>
				<ScrollView style={{ flex: 0.7, width, marginTop: 16 }}>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["00:00-01:00"].status],
							}}
							onPress={() => handleSlot("00:00-01:00")}
						>
							<Text>00:00 - 01:00</Text>
							<Badge data={status["00:00-01:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["01:00-02:00"].status],
							}}
							onPress={() => handleSlot("01:00-02:00")}
						>
							<Text>01:00 - 02:00</Text>
							<Badge data={status["01:00-02:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["02:00-03:00"].status],
							}}
							onPress={() => handleSlot("02:00-03:00")}
						>
							<Text>02:00 - 03:00</Text>
							<Badge data={status["02:00-03:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["03:00-04:00"].status],
							}}
							onPress={() => handleSlot("03:00-04:00")}
						>
							<Text>03:00 - 04:00</Text>
							<Badge data={status["03:00-04:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["04:00-05:00"].status],
							}}
							onPress={() => handleSlot("04:00-05:00")}
						>
							<Text>04:00 - 05:00</Text>
							<Badge data={status["04:00-05:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["05:00-06:00"].status],
							}}
							onPress={() => handleSlot("05:00-06:00")}
						>
							<Text>05:00 - 06:00</Text>
							<Badge data={status["05:00-06:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["06:00-07:00"].status],
							}}
							onPress={() => handleSlot("06:00-07:00")}
						>
							<Text>6:00 - 7:00</Text>
							<Badge data={status["06:00-07:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["07:00-08:00"].status],
							}}
							onPress={() => handleSlot("07:00-08:00")}
						>
							<Text>7:00 - 8:00</Text>
							<Badge data={status["07:00-08:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["08:00-09:00"].status],
							}}
							onPress={() => handleSlot("08:00-09:00")}
						>
							<Text>8:00 - 9:00</Text>
							<Badge data={status["08:00-09:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["09:00-10:00"].status],
							}}
							onPress={() => handleSlot("09:00-10:00")}
						>
							<Text>9:00 - 10:00</Text>
							<Badge data={status["09:00-10:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["10:00-11:00"].status],
							}}
							onPress={() => handleSlot("10:00-11:00")}
						>
							<Text>10:00 - 11:00</Text>
							<Badge data={status["10:00-11:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["11:00-12:00"].status],
							}}
							onPress={() => handleSlot("11:00-12:00")}
						>
							<Text>11:00 - 12:00</Text>
							<Badge data={status["11:00-12:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["12:00-13:00"].status],
							}}
							onPress={() => handleSlot("12:00-13:00")}
						>
							<Text>12:00 - 13:00</Text>
							<Badge data={status["12:00-13:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["13:00-14:00"].status],
							}}
							onPress={() => handleSlot("13:00-14:00")}
						>
							<Text>13:00 - 14:00</Text>
							<Badge data={status["13:00-14:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["14:00-15:00"].status],
							}}
							onPress={() => handleSlot("14:00-15:00")}
						>
							<Text>14:00 - 15:00</Text>
							<Badge data={status["14:00-15:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["15:00-16:00"].status],
							}}
							onPress={() => handleSlot("15:00-16:00")}
						>
							<Text>15:00 - 16:00</Text>
							<Badge data={status["15:00-16:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["16:00-17:00"].status],
							}}
							onPress={() => handleSlot("16:00-17:00")}
						>
							<Text>16:00 - 17:00</Text>
							<Badge data={status["16:00-17:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["17:00-18:00"].status],
							}}
							onPress={() => handleSlot("17:00-18:00")}
						>
							<Text>17:00 - 18:00</Text>
							<Badge data={status["17:00-18:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["18:00-19:00"].status],
							}}
							onPress={() => handleSlot("18:00-19:00")}
						>
							<Text>18:00 - 19:00</Text>
							<Badge data={status["18:00-19:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["19:00-20:00"].status],
							}}
							onPress={() => handleSlot("19:00-20:00")}
						>
							<Text>19:00 - 20:00</Text>
							<Badge data={status["19:00-20:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["20:00-21:00"].status],
							}}
							onPress={() => handleSlot("20:00-21:00")}
						>
							<Text>20:00 - 21:00</Text>
							<Badge data={status["20:00-21:00"].status} />
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.row }}>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["21:00-22:00"].status],
							}}
							onPress={() => handleSlot("21:00-22:00")}
						>
							<Text>21:00 - 22:00</Text>
							<Badge data={status["21:00-22:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["22:00-23:00"].status],
							}}
							onPress={() => handleSlot("22:00-23:00")}
						>
							<Text>22:00 - 23:00</Text>
							<Badge data={status["22:00-23:00"].status} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.box,
								...styles[status["23:00-00:00"].status],
							}}
							onPress={() => handleSlot("23:00-00:00")}
						>
							<Text>23:00 - 0:00</Text>
							<Badge data={status["23:00-00:00"].status} />
						</TouchableOpacity>
					</View>
				</ScrollView>
				<View
					style={{
						flex: 0.1,
						justifyContent: "flex-end",
						marginBottom: 12,
					}}
				>
					<TouchableOpacity
						style={{
							...styles.mainButton,
							marginTop: 12,
							backgroundColor: selected ? "#01FF70" : "#DDDDDD",
						}}
						onPress={async () => await handleOccupySlot()}
					>
						<Text
							style={{
								...styles.mainHeading,
								fontSize: 18,
								color: "#fff",
							}}
						>
							Occupy Slot {slot}
						</Text>
					</TouchableOpacity>
				</View>
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
		width,
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 16,
		marginBottom: 16,
	},
	box: {
		width: width / 4,
		height: width / 4,
		borderWidth: StyleSheet.hairlineWidth,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#01FF70",
	},
	mainHeading: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
	},
	subHeading: {
		fontSize: 20,
		fontStyle: "italic",
		textAlign: "center",
	},
	mainButton: {
		width: width * 0.85,
		paddingVertical: 6,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	nonWorkingHrs: {
		backgroundColor: "#DDDDDD",
	},
	timeout: {
		backgroundColor: "#FFDC00",
	},
	fullCapacity: {
		backgroundColor: "#FF4136",
	},
});
