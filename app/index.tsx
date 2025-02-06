import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import "../_global.scss";

export default function HomeScreen() {
  const handleCreateShipment = () => {
    router.push("/create-shipment");
  };

  const handleViewBookings = () => {
    router.push("/view-bookings");
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-2xl font-bold">Shipment Booking App</Text>

      <View className="mt-8 w-full gap-4">
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg items-center"
          onPress={handleCreateShipment}
        >
          <Text className="text-white font-semibold">Create New Shipment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-500 py-3 rounded-lg items-center"
          onPress={handleViewBookings}
        >
          <Text className="text-white font-semibold">
            View Existing Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
