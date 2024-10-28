import { Alert } from "react-native";
import { publicRequest } from "../api/request";

export const handleQrcodeGenerator = async () => {
    try {
        const response = await publicRequest.post('/generate');
        
        // Check if the response is valid and has the expected structure
        if (response && response.data) {
            const { message, qrCode } = response.data;
            Alert.alert("Success", message);

            // You can handle the QR code data here
            const qrNumber = qrCode.qrNumber;
            const qrCodeData = qrCode.qrCodeData;
            const scanHistory = qrCode.scanHistory;

            return{qrNumber, qrCodeData, scanHistory}

        } else {
            Alert.alert("Error", "Unexpected response structure.");
            return null;
        }

    } catch (error) {
        // Handle errors from the API
        const errorMessage = error.response?.data?.message || "An error occurred while generating the QR code.";
        Alert.alert("Error", errorMessage);
        console.log(error);
    }
}


export const handlegetAllHistory = async () => {
    try {
        const res = await publicRequest.get('/allhistory');
        if (res && res.data && res.data.message) {
            const historyData = res.data.message.map(item => {
                const { qrNumber, qrCodeData, scanHistory } = item;
                // console.log(qrNumber);
                // console.log(scanHistory);
                console.log(qrCodeData);
                return { qrNumber, qrCodeData, scanHistory };
            });

            return historyData; // Return the array of history data objects
        }
    } catch (error) {
        console.log(error);
    }
}

