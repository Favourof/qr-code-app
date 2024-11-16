import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import icon from "../constants/icon";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image
        source={icon.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="font-psemibold  text-xl  text-center text-white">
        {title}
      </Text>
      <CustomButton
        title="Generate Code"
        handlePress={() => router.push("/generate")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
