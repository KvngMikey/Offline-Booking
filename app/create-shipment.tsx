import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ShipmentFormState, FormErrors } from "../constants/interfaces";
import { useNetInfo } from "@react-native-community/netinfo";
import { saveShipment, getShipments } from "../services/storage";

export default function CreateShipment() {
  const [formData, setFormData] = useState<ShipmentFormState>({
    senderName: "",
    receiverName: "",
    senderAddress: "",
    receiverAddress: "",
    packageSize: "",
    packageWeight: "",
    pickupDate: "",
    deliveryDate: "",
  });

  const { isConnected } = useNetInfo();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  useEffect(() => {
    if (isConnected) {
      // syncOfflineShipments();
    }
  }, [isConnected]);

  const handleInputChange = (field: keyof ShipmentFormState, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));

    // Clear error for the specific field when user types
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field]; // Remove error for this field
      return newErrors;
    });
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    field: keyof ShipmentFormState
  ) => {
    const currentDate = selectedDate || new Date();
    setShowPickupDatePicker(false);
    setShowDeliveryDatePicker(false);
    handleInputChange(field, currentDate.toISOString().split("T")[0]); // Formatting date as YYYY-MM-DD
  };

  // Validation for form fields
  const validateForm = () => {
    let errors: FormErrors = {};
    let isValid = true;

    if (!formData.senderName.trim()) {
      errors.senderName = "Sender's name is required!";
      isValid = false;
    }
    if (!formData.receiverName.trim()) {
      errors.receiverName = "Receiver's name is required!";
      isValid = false;
    }
    if (!formData.senderAddress.trim()) {
      errors.senderAddress = "Sender's address is required!";
      isValid = false;
    }
    if (!formData.receiverAddress.trim()) {
      errors.receiverAddress = "Receiver's address is required!";
      isValid = false;
    }
    if (!formData.packageSize.trim()) {
      errors.packageSize = "Package size is required!";
      isValid = false;
    }
    if (!formData.packageWeight.trim()) {
      errors.packageWeight = "Package weight is required!";
      isValid = false;
    }
    if (!formData.pickupDate) {
      errors.pickupDate = "Pickup date is required!";
      isValid = false;
    }
    if (!formData.deliveryDate) {
      errors.deliveryDate = "Delivery date is required!";
      isValid = false;
    } else if (
      new Date(formData.pickupDate) > new Date(formData.deliveryDate)
    ) {
      errors.deliveryDate = "Pickup date cannot be after delivery date!";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    const shipment = { ...formData };

    // Save shipment using storageService function
    const success = await saveShipment(shipment);

    // Show toast message
    Toast.show({
      type: success ? "success" : "error",
      text1: success ? "Shipment Saved" : "Error Saving Shipment",
      text2: isConnected
        ? "Shipment successfully synced."
        : "Saved offline. Will sync when online.",
    });

    if (success) {
      // Reset form
      setFormData({
        senderName: "",
        receiverName: "",
        senderAddress: "",
        receiverAddress: "",
        packageSize: "",
        packageWeight: "",
        pickupDate: "",
        deliveryDate: "",
      });

      setFormErrors({});
    }
  };

  const syncOfflineShipments = async () => {
    const storedShipments = await getShipments();

    if (storedShipments.length === 0) return;

    try {
      // Assume an API request is made here to sync shipments
      await AsyncStorage.removeItem("shipments");
      Toast.show({ type: "success", text1: "Offline shipments synced." });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sync Failed, Please try again later.",
      });
    }
  };

  return (
    <ScrollView className="flex-1 pt-3 px-4 bg-white">
      <View className="items-center">
        <Text className="text-2xl font-bold mb-5">Create a New Shipment</Text>
      </View>

      {/* Sender Name */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Sender's Name</Text>
        <TextInput
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          value={formData.senderName}
          onChangeText={(value) => handleInputChange("senderName", value)}
          placeholder="Enter Sender's Name"
          placeholderTextColor={"black"}
        />
        {formErrors.senderName && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.senderName}
          </Text>
        )}
      </View>

      {/* Receiver Name */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Receiver's Name</Text>
        <TextInput
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          value={formData.receiverName}
          onChangeText={(value) => handleInputChange("receiverName", value)}
          placeholder="Enter Receiver's Name"
          placeholderTextColor="black"
        />
        {formErrors.receiverName && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.receiverName}
          </Text>
        )}
      </View>

      {/* Sender Address */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Sender's Address</Text>
        <TextInput
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          value={formData.senderAddress}
          onChangeText={(value) => handleInputChange("senderAddress", value)}
          placeholder="Enter Sender's Address"
          placeholderTextColor="black"
        />
        {formErrors.senderAddress && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.senderAddress}
          </Text>
        )}
      </View>

      {/* Receiver Address */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Receiver's Address</Text>
        <TextInput
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          value={formData.receiverAddress}
          onChangeText={(value) => handleInputChange("receiverAddress", value)}
          placeholder="Enter Receiver's Address"
          placeholderTextColor="black"
        />
        {formErrors.receiverAddress && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.receiverAddress}
          </Text>
        )}
      </View>

      {/* Package Size */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Package Size</Text>
        <TextInput
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          value={formData.packageSize}
          onChangeText={(value) => handleInputChange("packageSize", value)}
          placeholder="Enter Package Size"
          placeholderTextColor="black"
        />
        {formErrors.packageSize && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.packageSize}
          </Text>
        )}
      </View>

      {/* Package Weight */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Package Weight</Text>
        <TextInput
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          value={formData.packageWeight}
          keyboardType="numeric"
          onChangeText={(value) => {
            if (/^\d*\.?\d*$/.test(value))
              handleInputChange("packageWeight", value);
          }}
          placeholder="Enter Package Weight"
          placeholderTextColor="black"
        />
        {formErrors.packageWeight && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.packageWeight}
          </Text>
        )}
      </View>

      {/* Pickup Date */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-1">Pickup Date</Text>
        <TouchableOpacity onPress={() => setShowPickupDatePicker(true)}>
          <View className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <TextInput
              className="text-black"
              value={formData.pickupDate}
              editable={false} // Prevents keyboard input
              placeholder="Pick a Date"
              placeholderTextColor="black"
            />
          </View>
        </TouchableOpacity>
        {formErrors.pickupDate && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.pickupDate}
          </Text>
        )}
        {showPickupDatePicker && (
          <DateTimePicker
            value={new Date(formData.pickupDate || Date.now())}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, "pickupDate")
            }
          />
        )}
      </View>

      {/* Delivery Date */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-1">Delivery Date</Text>
        <TouchableOpacity onPress={() => setShowDeliveryDatePicker(true)}>
          <View className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <TextInput
              className="text-black"
              value={formData.deliveryDate}
              editable={false} // Prevents keyboard input
              placeholder="Pick a Date"
              placeholderTextColor="black"
            />
          </View>
        </TouchableOpacity>
        {formErrors.deliveryDate && (
          <Text className="text-red-500 text-sm mt-1">
            {formErrors.deliveryDate}
          </Text>
        )}
        {showDeliveryDatePicker && (
          <DateTimePicker
            minimumDate={new Date(formData.pickupDate || Date.now())}
            value={new Date(formData.deliveryDate || Date.now())}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, "deliveryDate")
            }
          />
        )}
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg items-center"
        onPress={handleCreate}
      >
        <Text className="text-white font-semibold">Save Shipment</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
}
