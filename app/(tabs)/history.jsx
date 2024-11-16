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
  Modal,
} from "react-native";
import { fetchScanHistory, handlegetAllHistory } from "../../lib/qr-code";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import CustomToastHistory from "../../components/CustomToastHistory";

// const QRCodeListWithColumns = () => {

// };

const History = () => {
  const [alldata, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For filtered QR codes
  const [query, setQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isLoadingMap, setIsLoadingMap] = useState({});
  const [isAnyLoading, setIsAnyLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [holdQrCodeNumber, setHoldQrCodeNumber] = useState();

  useEffect(() => {
    getAllHistory();
  }, []);

  useEffect(() => {
    // Filter QR codes by the search query
    const newData = alldata.filter((item) =>
      item.qrNumber.toString().includes(query)
    );
    setFilteredData(newData);
  }, [query, alldata]);

  const getAllHistory = async () => {
    setLoading(true);
    try {
      const result = await handlegetAllHistory();
      setAllData(result || []);
      setFilteredData(result || []); // Set initial filtered data
    } catch (error) {
      Alert.alert("Error fetching QR history:", error);
      console.error("Error fetching QR history:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllHistory();
    setRefreshing(false);
  };

  const handlePress = async (item) => {
    if (isAnyLoading || isLoadingMap[item.qrNumber]) return;

    setIsLoadingMap((prev) => ({ ...prev, [item.qrNumber]: true }));
    setIsAnyLoading(true);
    setHoldQrCodeNumber(item.qrNumber);

    try {
      const history = await fetchScanHistory(item.qrNumber);
      if (history) {
        setSelectedHistory(history);
        setModalVisible(true);
      } else {
        Alert.alert("Hello", "No scan history found so far");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMap((prev) => ({ ...prev, [item.qrNumber]: false }));
      setIsAnyLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex-1 justify-center px-5 pt-16">
        <SearchInput className="mt-5" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </SafeAreaView>
    );
  }

  if (alldata.length === 0) {
    return (
      <View className="flex-1 justify-center items-center h-full bg-primary">
        <Text className="text-lg text-gray-500">No QR codes found</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider className="bg-primary">
      <SafeAreaView className="bg-primary pt-5 px-5 h-full">
        <View className="mt-10 mb-5">
          <Text className="text-white font-calligraf text-2xl ml-2">
            Search
          </Text>
          <SearchInput onSearchChange={setQuery} />
        </View>

        <View className="flex-1">
          <FlatList
            data={filteredData}
            keyExtractor={(item) => `qr-${item.qrNumber}`}
            numColumns={2}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
                className="flex-1 mx-1 my-1"
                disabled={isAnyLoading || isLoadingMap[item.qrNumber]}
              >
                <View className="flex pt-4 items-center border border-gray-300 rounded-lg bg-primary px-2 pb-3">
                  {isLoadingMap[item.qrNumber] ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Image
                      source={{ uri: item.qrCodeData }}
                      style={{ width: 120, height: 120 }}
                      resizeMode="contain"
                      onError={() =>
                        console.log(
                          `Failed to load image for QR ${item.qrNumber}`
                        )
                      }
                    />
                  )}
                  {isLoadingMap[item.qrNumber] ? (
                    ""
                  ) : (
                    <Text className="font-bold font-IBMP text-white text-3xl bg-gray-500 rounded-2xl border-white border-2 pt-1 -mt-2 w-full text-center">
                      {item.qrNumber}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View className="h-2" />}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 5 }}
            ListEmptyComponent={() => (
              <EmptyState
                title="Can not found the Data"
                subtitle="Come back when you generate QR code"
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />

          {/* Modal to display selected QR code details */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
            className="flex-auto justify-center items-center"
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                className="max-h-[80%] bg-primary"
                style={{
                  maxHeight: "80%",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <CustomToastHistory
                  qrno={holdQrCodeNumber}
                  scanHistorys={selectedHistory}
                  close={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default History;
