import { AsyncStorage } from "react-native";
import { Updates } from "expo";

export default async () => {
	await AsyncStorage.clear();
	Updates.reload();
};
