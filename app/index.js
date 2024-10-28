import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import icon from '../constants/icon';
import { Link, router } from 'expo-router';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-primary px-4">
     <Image 
     source={icon.logo}
     className='w-[200px] h-[200px]'
     resizeMode='contain'
     
     />
      <Text className=' font-calist text-3xl text-white'>Christ Authority Bible Church</Text>
      <Text className="text-center text-white py-12 font-cambay text-lg">Presented by the Media group to help and support the work of God, As a vessel in is vineyar d, may God bless every soul in Jesus name Amen.</Text>
      <CustomButton title={'Contiune with email'}
      textStyles={'px-8 w-full text-lg text-xl'}
      handlePress={() => {router.push('/scan')}}
      >
      </CustomButton>
     
    </View>
  );
}
