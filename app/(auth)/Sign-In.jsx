import { Alert, Image, SafeAreaView, ScrollView,  Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {Link, router} from 'expo-router'
import icon from '../../constants/icon';
import { handleLogin } from '../../lib/auth';



const SignIn = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  
   
  const submit = async () => {
   if (!form.email || !form.password) {
   return  Alert.alert('Error', "fill all Details")
   }
  
   setIsSubmitting(true)

   try {
     const result = await handleLogin({
      email: form.email,
      password: form.password
     })
    
     if (result) {
      console.log(result);
      Alert.alert("Succefully", 'log in succefully')
      router.replace("/generate");
      
     }
   } catch (error) {
    
   }finally{
    setIsSubmitting(false)
   }
   



    
  }



  return (
   <SafeAreaView className='bg-primary h-full '>
    <ScrollView >
      <View  className="justify-center w-full min-h-[89vh] px-4 my-6 ">
        <TouchableOpacity
        onPress={() => router.push('/')}
        >
        <Image
         source={icon.logo}
         className=" w-[105px] h-[105px]"
         resizeMode='contain'
         
         />
        </TouchableOpacity>
         
         <Text className="text-2xl text-white font-psemibold mt-10">Log in to Aora</Text>
        <FormField
        title='Email'
         placeholder='Email'
        value={form.email}
        handleChangeText ={(e) => setForm({...form, email: e})}
        otherStyle="mt-7"
        keyboardType="email Address"

        />
         <FormField
        title='Password'
        value={form.password}
        placeholder='password'
        handleChangeText ={(e) => setForm({...form, password: e})}
        otherStyle="mt-7"
       

        />

        <CustomButton 
        title="Sign In"
        containerStyles="mt-7"
        handlePress={submit}
        isLoading={isSubmitting}
        />

        <View className="flex-row gap-2 justify-center py-6">
          <Text className="text-gray-100 font-pregular text-lg">
            Don't have account
          </Text>
          <Link href="/Sign-Up" className="text-secondary font-psemibold  text-lg">
            Sign-up
          </Link>
        </View>

       
      </View  >
    </ScrollView>

   </SafeAreaView>
  )
}

export default SignIn

