import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import icon from "../../constants/icon";
import { fetchScanHistory, handlegetAllHistory } from "../../lib/qr-code";
import CustomToastHistory from "../../components/CustomToastHistory";

const SearchAdvance = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isLoadingMap, setIsLoadingMap] = useState({});
  const [isAnyLoading, setIsAnyLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [holdQrCodeNumber, setHoldQrCodeNumber] = useState(null);

  useEffect(() => {
    getAllHistory();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = allData.filter((item) =>
        item.qrNumber.toString().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(allData); // Reset to all data if query is cleared
    }
  }, [query, allData]);

  const getAllHistory = async () => {
    setLoading(true);
    try {
      const result = await handlegetAllHistory();
      setAllData(result || []);
      console.table(
        "QR Numbers:",
        result?.map((item) => item.qrNumber)
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not fetch QR history. Please try again later."
      );
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
        Alert.alert("Notice", "No scan history found for this QR code.");
      }
    } catch (error) {
      console.error("Error fetching scan history:", error);
    } finally {
      setIsLoadingMap((prev) => ({ ...prev, [item.qrNumber]: false }));
      setIsAnyLoading(false);
    }
  };

  const handleSettings = ({ ...child }) => {
    console.log();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary pt-5 px-5 h-full">
        <View className="mt-10 mb-5">
          <Text className="text-white font-calligraf text-2xl ml-2">
            Search
          </Text>
          <SearchInput onSearchChange={setQuery} />
        </View>

        <View className="flex-1">
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => `qr-${item.qrNumber}`}
              numColumns={1}
              scrollEnabled={true}
              refreshing={refreshing}
              onRefresh={onRefresh}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePress(item)}
                  activeOpacity={0.7}
                  className="flex mx-1 my-1"
                  disabled={isAnyLoading || isLoadingMap[item?.qrNumber]}
                >
                  <View className="flex-row justify-between px-2 py-2 rounded-3xl border-2 border-white">
                    <View className="w-[70%] align-middle">
                      {isLoadingMap[item.qrNumber] ? (
                        <ActivityIndicator
                          style="center"
                          size="small"
                          color="#ffffff"
                        />
                      ) : (
                        <Text className="text-white font-IBMPB text-3xl">
                          {item.qrNumber}
                        </Text>
                      )}
                    </View>
                    <View className="flex-row justify-between w-[20%]">
                      <TouchableOpacity>
                        <Image
                          className="w-8 h-8"
                          resizeMode="contain"
                          source={icon.block}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSettings(item, "block", "delete")}
                      >
                        <Image
                          className="w-8 h-8"
                          resizeMode="contain"
                          source={icon.Delete}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View className="h-2" />}
              contentContainerStyle={{
                paddingBottom: 20,
                paddingHorizontal: 5,
              }}
              ListEmptyComponent={() => (
                <View className="flex-1 justify-center items-center mt-10">
                  <Text className="text-white text-center">
                    No QR codes found.
                  </Text>
                </View>
              )}
            />
          )}

          {/* Modal for displaying QR code history */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center">
              <View className="max-h-[80%] bg-primary rounded-2xl overflow-hidden p-5">
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

export default SearchAdvance;
