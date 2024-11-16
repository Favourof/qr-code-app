import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import icon from "../constants/icon";

const CustomToast = ({ scanHistorys, qrno }) => {
  const getBorderColor = (status) =>
    status ? "border-orange-500" : "border-red-500";
  const date = new Date();
  const options = { weekday: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <ScrollView className="flex-grow-1  my-20">
      <View className="flex-1 justify-center items-center px-4">
        <View className="bg-primary w-full  h-[500px] rounded-3xl p-5">
          <View className=" w-full h-full rounded-3xl border-white border-2 p-5">
            <Text className="text-white font-IBMPB text-2xl text-center">
              {qrno}
            </Text>
            <Text className="font-pmedium text-white text-2xl mt-5">
              {formattedDate}
            </Text>

            <View className="mt-4">
              <Text className="text-white">Breakfast</Text>
              <View
                className={`w-full flex-row justify-items-center justify-between px-3 items-center  bg-gray-200 mt-2 h-[50px] border-4 ${getBorderColor(
                  scanHistorys?.breakfast
                )} rounded-3xl`}
              >
                <Image
                  source={scanHistorys?.breakfast ? icon.taken : icon.Not}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Text className="text-primary font-extrabold text-2xl">
                  {scanHistorys?.breakfast ? "Taken" : "Not Taken"}
                </Text>
                <Image
                  source={scanHistorys?.breakfast ? icon.Check : icon.close}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="mt-10">
              <Text className="text-white">Lunch</Text>
              <View
                className={`w-full flex-row justify-items-center justify-between px-3 items-center  bg-gray-200 mt-2 h-[50px] border-4 ${getBorderColor(
                  scanHistorys?.lunch
                )} rounded-3xl`}
              >
                <Image
                  source={scanHistorys?.lunch ? icon.taken : icon.Not}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Text className="text-primary font-extrabold text-2xl">
                  {scanHistorys?.lunch ? "Taken" : "Not Taken"}
                </Text>
                <Image
                  source={scanHistorys?.lunch ? icon.Check : icon.close}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="mt-10">
              <Text className="text-white">Dinner</Text>
              <View
                className={`w-full flex-row justify-items-center justify-between px-3 items-center  bg-gray-200 mt-2 h-[50px] border-4 ${getBorderColor(
                  scanHistorys?.dinner
                )} rounded-3xl`}
              >
                <Image
                  source={scanHistorys?.dinner ? icon.taken : icon.Not}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Text className="text-primary font-extrabold text-2xl">
                  {scanHistorys?.dinner ? "Taken" : "Not Taken"}
                </Text>
                <Image
                  source={scanHistorys?.dinner ? icon.Check : icon.close}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomToast;
