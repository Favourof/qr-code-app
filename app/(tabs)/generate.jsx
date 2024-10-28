import { Image, SafeAreaView, Text, View, Alert } from 'react-native';
import React, { useState } from 'react'; // Import useState
import icon from '../../constants/icon';
import CustomButton from '../../components/CustomButton';
import { handleQrcodeGenerator } from '../../lib/qr-code';

const Generate = () => {
  const [qrnumber, setQrnumber] = useState();
  const [qrdata, setQrdata] = useState();
  const [scanhistory, setScanHistory] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false); // Moved useState outside of submit function

  const submit = async () => {
    console.log('hello');
    
    setIsSubmitting(true); // Set isSubmitting to true

    try {
    const result =  await handleQrcodeGenerator(); // Await the QR code generation
    if (result) {
      setQrnumber(result.qrNumber)
      setQrdata(result.qrCodeData)
      setScanHistory(result.scanHistory)
    }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred during QR code generation."); // Added error alert
    } finally {
      setIsSubmitting(false); // Reset isSubmitting to false
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex justify-center items-center pt-40">
        <View className="px-5 flex items-center justify-center w-60 h-60 bg-gray-800 rounded-lg border-4 border-orange-400">
        {qrdata ? (
            // Display the generated QR code
            <Image
              source={{ uri: qrdata }}
              style={{ width: 180, height: 180}}  // Adjust the size as needed
              resizeMode='contain'
              accessibilityLabel="Generated QR Code"
            />
          ) : (
            // Display the placeholder icon if no QR code is generated yet
            <Image
              source={icon.Plus}
              style={{ width: 100, height: 100 }} // Adjust the size as needed
              accessibilityLabel="QR Code Generator Icon"
            />
          )}
         
        </View>

        <Text className="text-3xl text-white py-20">
         {qrnumber ? `Qr code: ${qrnumber}` :  "No QR Code Generated Yet" }
        </Text>

        <CustomButton
          title={isSubmitting ? "Generating..." : "Generate QR Code"} // Change button text based on state
          textStyles="px-5 text-2xl"
          handlePress={submit}
          disabled={isSubmitting} // Disable the button while submitting
        />
      </View>
    </SafeAreaView>
  );
};

export default Generate;
