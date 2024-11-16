import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import icon from "../../constants/icon";
import { publicRequest } from "../../api/request";
import CustomToast from "../../components/CustomToast";

export default function ScanCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalSatus, setModalSatus] = useState(false);
  const [scanHistorys, setScanHistory] = useState(null);
  const [qrNo, setQrNo] = useState("001");

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ data }) => {
    setScanned(true);
    // alert(`Bar code with type and data ${data} has been scanned!`);
    // Extract QR code number (this will depend on your QR code data format)
    const qrNumber = data.split("#")[1]; // Assuming `data` is the QR number, adjust if needed

    console.log(qrNumber);
    setQrNo(qrNumber);

    setIsLoading(true);

    try {
      // Send a POST request to update the meal status
      const response = await publicRequest.post("/scan", { qrNumber });

      // Handle the API response
      if (response && response.data) {
        const { message, qrCode, error } = response.data;

        // Check if qrCode exists before accessing its properties
        if (qrCode) {
          const { scanHistory } = qrCode;
          setScanHistory(scanHistory);
          console.log("QR Code Details:", qrCode);
          console.log("Scan History:", scanHistory);

          // Optionally, display a success message
          Alert.alert("Success", `${message}. Scan history updated.`);
          setModalSatus(true);
        } else {
          // If no QR code data, display the message only
          console.log("Message:", error);
          // Alert.alert("Success", error);
        }
      } else {
        // Handle unexpected response structure
        Alert.alert("Error", "Unexpected response structure from the server.");
      }
    } catch (error) {
      // Enhanced error handling
      const errorMessage =
        error.response?.data?.error || "An error occurred during scanning.";
      Alert.alert("Error", errorMessage); // Display the specific error message from backend
      console.error("API Error:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="flex-1 ">
      <View onPress className="flex-1 ">
        <CameraView
          className="w-full h-full "
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          // style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          // <Button className='absolute bottom-10 left-1/2 transform -translate-x-1/2 ' title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
          <TouchableOpacity
            onPress={() => {
              setScanned(false), setIsLoading(false);
            }}
            className=" absolute bottom-20  items-center w-full"
          >
            {/* <Text className='text-black'>hello world</Text>   */}
            <Image
              source={icon.Scan}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <View className=" absolute bottom-96 w-full items-center">
          {!isLoading ? (
            ""
          ) : (
            <Text className=" text-white text-3xl font-pmedium  items-center">
              Loading....
            </Text>
          )}
        </View>
      </View>

      <View>
        <Modal visible={modalSatus} transparent={true}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setModalSatus(false)}
          >
            <CustomToast qrno={qrNo} scanHistorys={scanHistorys} />
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
