import React from "react";
import {
	Modal,
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default ({ showTerms, setShowTerms }) => {
	return (
		<Modal
			visible={showTerms}
			onRequestClose={() => setShowTerms(false)}
			animationType="slide"
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "white",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						textAlign: "center",
						fontSize: 20,
						textDecorationLine: "underline",
					}}
				>
					Terms Of Service
				</Text>
				<ScrollView
					style={{ marginVertical: 12, paddingHorizontal: 12 }}
				>
					<Text style={{ ...styles.textStyle }}>
						1. Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Sed id velit nisi. Nullam lacus lorem, tempus ac
						accumsan ac, volutpat vitae erat. Suspendisse maximus
						vel dolor at dictum. Aliquam lacinia urna felis, et
						rutrum erat vestibulum non. Praesent convallis imperdiet
						urna vitae mollis.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						2. Vivamus vel iaculis ante, ut tincidunt tellus.
						Pellentesque habitant morbi tristique senectus et netus
						et malesuada fames ac turpis egestas. Mauris tempor sem
						eget tellus auctor mollis.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						3. Nullam vehicula vulputate quam vitae porttitor.
						Quisque vestibulum nisi turpis, faucibus semper augue
						tempor quis.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						4. Etiam eleifend mauris at diam ullamcorper finibus.
						Vestibulum sit amet ipsum accumsan, blandit ipsum eu,
						consectetur ex. Nam vehicula sapien vitae ex molestie,
						id ultricies libero consequat. Nam maximus volutpat odio
						sit amet blandit.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						5. Donec sit amet velit non neque rutrum porta vitae nec
						tortor. Donec rutrum fermentum gravida. Nam risus nunc,
						dignissim eu molestie non, ornare non sapien. Ut
						convallis feugiat dui, eu consequat arcu cursus sed.
						Curabitur dictum tellus placerat lacus porttitor, in
						ultrices lectus ultrices. Etiam a lorem vestibulum,
						lacinia enim suscipit, faucibus ante.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						6. You agree not to reproduce, duplicate, copy, sell,
						resell or exploit any portion of the Service, use of the
						Service, or access to the Service without the express
						written permission by Expo.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						7. Donec at enim sit amet est semper faucibus. Nam a
						sollicitudin risus. Mauris et imperdiet ligula. Nulla
						nisl nibh, mattis non metus eget, volutpat rhoncus
						mauris. Aliquam erat volutpat. Pellentesque hendrerit
						consectetur pretium. Phasellus eleifend sem quis neque
						ultrices, non facilisis ex tincidunt. Phasellus rhoncus,
						sem eu auctor egestas, arcu lorem blandit felis, id
						consequat nisi lorem eu turpis. Aliquam vel tempor eros.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						8. Sed vel metus id ante facilisis pharetra at ac quam.
						Nam non convallis nunc, sit amet commodo quam. Aenean
						malesuada mauris lectus, in sodales sapien tincidunt
						feugiat.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						9. Sed pharetra ex id ante facilisis, eget bibendum
						felis rhoncus. Aliquam et velit tristique, feugiat arcu
						nec, suscipit nulla. Aliquam id iaculis est, ut
						condimentum diam. Pellentesque justo augue, blandit eget
						iaculis ullamcorper, molestie quis arcu.
					</Text>
					<Text style={{ ...styles.textStyle }}>
						10. Morbi leo nulla, viverra ut varius id, blandit sed
						nulla. Pellentesque vitae enim vel tellus feugiat
						suscipit eget eu arcu. Phasellus viverra tempor
						ultricies.
					</Text>
				</ScrollView>
				<TouchableOpacity
					style={{ ...styles.mainButton, marginTop: 12 }}
					onPress={() => setShowTerms(false)}
				>
					<Text
						style={{
							...styles.mainHeading,
							fontSize: 18,
							color: "#000",
						}}
					>
						I Understand
					</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		// height: 24,
		color: "gray",
		fontSize: 18,
		marginBottom: 16,
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
});
