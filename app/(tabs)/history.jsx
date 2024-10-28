import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { handlegetAllHistory } from "../../lib/qr-code";
import { SafeAreaProvider } from "react-native-safe-area-context";

const QRCodeListWithColumns = () => {
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllHistory();
  }, []);

  const getAllHistory = async () => {
    setLoading(true);
    try {
      const result = await handlegetAllHistory();
      if (result) {
        setAllData(result);
      } else {
        console.log("No data received from handlegetAllHistory");
      }
    } catch (error) {
      console.error("Error fetching QR history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item) => {
    Alert.alert("QR Code Data", `Number: ${item.qrNumber}`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (alldata.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">No QR codes found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={alldata}
      keyExtractor={(item) => `qr-${item.qrNumber}`}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          activeOpacity={0.7}
          className="flex-1 mx-1 my-1"
        >
          <View className="flex-1 p-2 items-center border border-gray-300 rounded-lg bg-gray-100">
            <Image
              source={{ uri: item.qrCodeData }}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
              onError={() =>
                console.log(`Failed to load image for QR ${item.qrNumber}`)
              }
            />
            <Text className="text-lg font-bold mt-2">
              QR Number: {item.qrNumber}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View className="h-full" />}
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 5 }}
    />
  );
};

const History = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary flex-1 pt-5 px-5 h-full">
        <QRCodeListWithColumns />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default History;
