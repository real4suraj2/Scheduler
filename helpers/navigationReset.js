import { CommonActions } from "@react-navigation/native";

export default (navigation, route) => {
	navigation.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [{ name: route }],
		})
	);
};
