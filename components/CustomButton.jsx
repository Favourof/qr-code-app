import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, textStyles, containerStyles, isLoading}) => {
  return (

   <TouchableOpacity className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center font-psemibold text-lg ${containerStyles} ${isLoading ? 'opacity-50' : ''}` }
   onPress={handlePress}
   disabled={isLoading}
   >

      <Text className={`text-lg font-psemibold ${textStyles}`}>{title}</Text>

   </TouchableOpacity>
  )
}

export default CustomButton