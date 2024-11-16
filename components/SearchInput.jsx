import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import icon from "../constants/icon";
import { router, usePathname } from "expo-router";

const SearchInput = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const handleSearch = () => {
    if (!query.trim()) {
      Alert.alert("Missing Query", "Please enter something to search.");
      return;
    }
    onSearchChange(query); // Trigger the filtering with query
  };

  return (
    <View className="bg-black-100 w-full px-4 h-16 rounded-2xl border-2 border-black-200 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-white font-pregular mt-0.5 text-base flex-1"
        placeholder="Search Qr code"
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => {
          setQuery(text);
          onSearchChange(text); // Update query in QRCodeListWithColumns
        }}
        value={query}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icon.search} className="h-6 w-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
