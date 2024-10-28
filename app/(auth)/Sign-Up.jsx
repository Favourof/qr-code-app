import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import icon from '../../constants/icon';
import { handleSignup } from '../../lib/auth';  // Adjust the import if needed

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const submit = async () => {
    if (!form.email || !form.username || !form.password) {
      return Alert.alert("Error", "Please fill in all your details");
    }

    setIsSubmitting(true);

    try {
      const result = await handleSignup({
        email: form.email,
        password: form.password,
        username: form.username
      });

      if (result) {
        console.log(result);
        Alert.alert("Success", "Account created successfully!");
        router.replace("/Sign-In");  // Redirect to sign-in page after successful signup
      }
    } catch (error) {
      Alert.alert("Error",   error.response.data.message || "An error occurred during signup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className="justify-center w-full min-h-[89vh] px-4 my-6">
        <TouchableOpacity
        onPress={() => router.push('/')}
        >
        <Image
         source={icon.logo}
         className=" w-[105px] h-[105px]"
         resizeMode='contain'
         
         />
        </TouchableOpacity>
          <Text className="text-2xl text-white font-semibold mt-10">Sign Up to QR Code</Text>

          {/* Username field */}
          <FormField
            title='Username'
            placeholder='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyle="mt-10"
          />

          {/* Email field */}
          <FormField
            title='Email'
            placeholder='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />

          {/* Password field */}
          <FormField
            title='Password'
            placeholder='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            secureTextEntry
          />

          {/* Submit button */}
          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          {/* Link to Sign-In */}
          <View className="flex-row gap-2 justify-center py-6">
            <Text className="text-gray-100 font-regular text-lg">
              Already have an account?
            </Text>
            <Link href="/Sign-In" className="text-secondary font-semibold text-lg">
              Sign-In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
