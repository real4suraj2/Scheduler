import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Reanimated
import Animated, { Easing } from "react-native-reanimated";

//Helpers
import navigationReset from "../helpers/navigationReset";

//Components
import TermsOfService from "../components/TermsOfService";
import Loading from "../components/Loading";

//Screens
import Login from "./Login";

const { width, height } = Dimensions.get("window");
export default ({ navigation }) => {
	const [showTerms, setShowTerms] = useState(false);
	const [loading, setLoading] = useState(false);
	const [translateY, setTranslateY] = useState(new Animated.Value(0));
	useEffect(() => {
		setLoading(true);
		const _retreiveData = async () => {
			try {
				const id = await AsyncStorage.getItem("id");
				const token = await AsyncStorage.getItem("token");
				if (id != null && token != null) {
					navigationReset(navigation, "Home");
					navigation.navigate("Home");
				}
			} catch (e) {
				console.log("Error !");
			}
			setLoading(false);
		};
		_retreiveData();
	}, []);

	return (
		<View style={{ ...styles.container, flex: 1 }}>
			<Animated.View
				style={{
					...styles.container,
					flex: 1,
					transform: [{ translateY: translateY }],
				}}
			>
				<View style={{ flex: 0.3, marginTop: 32 }}>
					<Text
						style={{
							...styles.mainHeading,
						}}
					>
						Welcome to{" "}
					</Text>
					<Text style={{ ...styles.mainHeading }}>
						<Text
							style={{
								color: "#B10DC9",
							}}
						>
							Scheduler
						</Text>
						,
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
					<TouchableOpacity
						onPress={() => {
							Animated.timing(translateY, {
								toValue: -260,
								duration: 500,
								easing: Easing.linear,
							}).start();
						}}
					>
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
					<TouchableOpacity
						onPress={() => navigation.push("Merchant")}
						style={{
							...styles.mainButton,
							backgroundColor: "#B10DC9",
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
					<TouchableOpacity onPress={() => setShowTerms(true)}>
						<Text style={{ ...styles.subButton }}>
							Terms of service{" "}
						</Text>
					</TouchableOpacity>
				</View>
				<TermsOfService
					showTerms={showTerms}
					setShowTerms={setShowTerms}
				/>
			</Animated.View>
			<Animated.View
				style={{
					...styles.loginContainer,
					transform: [{ translateY: translateY }],
				}}
			>
				<Login
					navigation={navigation}
					translateY={translateY}
					setLoading={setLoading}
				/>
			</Animated.View>
			{loading && <Loading />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
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
	loginContainer: {
		position: "absolute",
		top: height + 100,
	},
});
