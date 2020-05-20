//Native Library Imports
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Alert,
  Dimensions,
} from "react-native";

//Expo Libraries
import { BarCodeScanner } from "expo-barcode-scanner";

const { width, height } = Dimensions.get("window");

export default ({ showScanner, setShowScanner, visitors }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const res =
      Object.keys(visitors).find((el) => el == data) == data
        ? "Match Found"
        : "Visitor UnMatched";
    if (res == "Match Found") {
      Alert.alert(
        res,
        `The provided UID has access to slot ${visitors[data]}`,
        [{ text: "OK", onPress: () => {} }],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        res,
        "The provided UID is not permitted to occupy this time slot",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: true }
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      onRequestClose={() => setShowScanner(false)}
      visible={showScanner}
      animationType="slide"
      style={{
        ...styles.container,
        width,
        height: height + 50,
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          ...styles.container,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={["qr"]}
        />

        {scanned && (
          <Button title={"Scan Again"} onPress={() => setScanned(false)} />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
