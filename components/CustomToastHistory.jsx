import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import icon from "../constants/icon";

const CustomToastHistory = ({ scanHistorys, qrno, close }) => {
  const getBorderColor = (status) =>
    status ? "border-orange-500" : "border-red-500";

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View className="flex-1 justify-center items-center px-4">
        <View className="bg-primary w-full rounded-3xl p-5">
          <View className="w-full h-full rounded-3xl border-white border-2 p-5">
            <Text className="text-white font-IBMPB text-2xl text-center">
              QR Code: {qrno}
            </Text>
            <Text
              className="text-red-500 text-right font-bold text-xl"
              onPress={close}
            >
              <Image
                source={icon.close}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </Text>

            {scanHistorys.map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString(
                "en-US",
                { weekday: "short", day: "numeric", year: "numeric" }
              );

              return (
                <View key={item._id} className="mb-5">
                  <Text className="font-pmedium text-white text-2xl mt-5">
                    {formattedDate}
                  </Text>

                  {/* Breakfast Status */}
                  <View className="mt-4">
                    <Text className="text-white">Breakfast</Text>
                    <View
                      className={`w-full flex-row justify-between items-center bg-gray-200 mt-2 h-[50px] border-4 ${getBorderColor(
                        item.scanHistory.breakfast
                      )} rounded-3xl px-3`}
                    >
                      <Image
                        source={
                          item.scanHistory.breakfast ? icon.taken : icon.Not
                        }
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                      <Text className="text-primary font-extrabold text-2xl">
                        {item.scanHistory.breakfast ? "Taken" : "Not Taken"}
                      </Text>
                      <Image
                        source={
                          item.scanHistory.breakfast ? icon.Check : icon.close
                        }
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  {/* Lunch Status */}
                  <View className="mt-4">
                    <Text className="text-white">Lunch</Text>
                    <View
                      className={`w-full flex-row justify-between items-center bg-gray-200 mt-2 h-[50px] border-4 ${getBorderColor(
                        item.scanHistory.lunch
                      )} rounded-3xl px-3`}
                    >
                      <Image
                        source={item.scanHistory.lunch ? icon.taken : icon.Not}
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                      <Text className="text-primary font-extrabold text-2xl">
                        {item.scanHistory.lunch ? "Taken" : "Not Taken"}
                      </Text>
                      <Image
                        source={
                          item.scanHistory.lunch ? icon.Check : icon.close
                        }
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  {/* Dinner Status */}
                  <View className="mt-4">
                    <Text className="text-white">Dinner</Text>
                    <View
                      className={`w-full flex-row justify-between items-center bg-gray-200 mt-2 h-[50px] border-4 ${getBorderColor(
                        item.scanHistory.dinner
                      )} rounded-3xl px-3`}
                    >
                      <Image
                        source={item.scanHistory.dinner ? icon.taken : icon.Not}
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                      <Text className="text-primary font-extrabold text-2xl">
                        {item.scanHistory.dinner ? "Taken" : "Not Taken"}
                      </Text>
                      <Image
                        source={
                          item.scanHistory.dinner ? icon.Check : icon.close
                        }
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomToastHistory;
