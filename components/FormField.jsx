import {  Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icon from '../constants/icon';

const FormField = ({title, value, placeholder, handleChangeText, otherStyle, ...props}) => {
    const [shownPassword, setShownPassword] = useState(false);
  return (
    <View className={`${otherStyle}`}>
      <Text className="text-base text-gray-100 font-pmedium ">{title}</Text>
      <View className="bg-black-100 w-full px-4 h-16 rounded-2xl border-2 border-black-200 focus:border-secondary items-center flex-row">
        <TextInput className="flex-1 text-white font-psemibold text-base w-full"
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        value={value}
        secureTextEntry={title=== "Password" && !shownPassword}
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => setShownPassword(!shownPassword)}>
               <Image 
               source={!shownPassword ? icon.eye : icon.eyeHide }
               className="h-6 w-6"
               resizeMode='contain'
               />
            </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField

