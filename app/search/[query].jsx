import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl text-black">{query}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;
