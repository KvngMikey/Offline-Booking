import AsyncStorage from "@react-native-async-storage/async-storage";

const SHIPMENTS_KEY = "shipments";

// Store shipment in AsyncStorage
export const saveShipment = async (shipment: any) => {
  try {
    const existingShipments = await AsyncStorage.getItem(SHIPMENTS_KEY);
    const updatedShipments = existingShipments ? JSON.parse(existingShipments) : [];
    updatedShipments.push(shipment);
    await AsyncStorage.setItem(SHIPMENTS_KEY, JSON.stringify(updatedShipments));
    return true;
  } catch (error) {
    return false;
  }
};

// Retrieve shipments from AsyncStorage
export const getShipments = async () => {
  try {
    const storedShipments = await AsyncStorage.getItem(SHIPMENTS_KEY);
    return storedShipments ? JSON.parse(storedShipments) : [];
  } catch (error) {
    return [];
  }
};

// Sync shipments to the server (dummy function for now)
export const syncShipments = async (shipments: any[]) => {
  try {
    // Example of syncing to a server (replace with actual API call)
    // Simulating successful sync
    return true;
  } catch (error) {
    return false;
  }
};
