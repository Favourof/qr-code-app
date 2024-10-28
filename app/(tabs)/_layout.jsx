import {  Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from "expo-router";
import icon from '../../constants/icon';

const TabIcon = ({icon, color, name, focused}) => {
         return (
          <View className='items-center justify-center gap-2'>
            <Image 
            source={icon}
            resizeMode='contains'
            tintColor={color}
            className="w-6 h-6 text-orange-600"
            />
             <Text className={`${focused ? 'font-semibold' : 'font-regular'} text-xs`} style={{color: color}}>
              {name}
             </Text>
          </View>
         )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'orange',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 1,
        borderTopColor: '#232533',
        height: 64
      }

    }}
    >
      
      <Tabs.Screen 
      name='generate' 
      options={{
        title: 'Generate',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
           <TabIcon 
             icon={icon.QrCode}
             color={color}
             name="Generate"
             focused={focused}

           />
        )

      }}
      />

<Tabs.Screen 
      name='scan' 
      options={{
        title: 'Scan',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
           <TabIcon 
             icon={icon.Scan}
             color={color}
             name="Scan"
             focused={focused}

           />
        )

      }}
      />
      
      <Tabs.Screen 
      name='history' 
      options={{
        title: 'History',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
           <TabIcon 
             icon={icon.history}
             color={color}
             name="History"
             focused={focused}

           />
        )

      }}
      />

<Tabs.Screen 
      name='settings' 
      options={{
        title: 'Settings',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
           <TabIcon 
             icon={icon.Advance}
             color={color}
             name="Settings"
             focused={focused}

           />
        )

      }}
      />

    </Tabs>
    </>
  )
}

export default TabsLayout
