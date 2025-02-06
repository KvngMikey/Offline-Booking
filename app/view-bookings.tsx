import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { getShipments } from "../services/storage";
import { router } from "expo-router";

export default function ViewBookings() {
  const [shipments, setShipments] = useState<any[]>([]);

  useEffect(() => {
    const fetchShipments = async () => {
      const storedShipments = await getShipments();
      setShipments(storedShipments || []);
    };
    fetchShipments();
  }, []);

  return (
    <ScrollView className="bg-gray-100 p-5">
      <View className="flex-1 space-y-4 pb-16">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">
          Existing Shipments
        </Text>

        <ScrollView>
          {shipments.length > 0 ? (
            shipments.map((shipment, index) => (
              <View
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <Text className="text-lg font-medium text-gray-800">
                  Sender:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.senderName}
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Receiver:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.receiverName}
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Pickup Address:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.senderAddress}
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Delivery Address:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.receiverAddress}
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Size:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.packageSize}
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Weight:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.packageWeight} kg
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Pickup Date:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.pickupDate}
                  </Text>
                </Text>
                <Text className="text-lg font-medium text-gray-800">
                  Delivery Date:{" "}
                  <Text className="font-normal text-gray-600">
                    {shipment.deliveryDate}
                  </Text>
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-center text-gray-600">
              No shipments available
            </Text>
          )}
        </ScrollView>

        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-blue-500 text-white mt-4 py-2 px-6 rounded-full shadow-md absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <Text className="text-white text-lg font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
