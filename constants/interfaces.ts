export interface ShipmentFormState {
  senderName: string;
  receiverName: string;
  senderAddress: string;
  receiverAddress: string;
  packageSize: string;
  packageWeight: string;
  pickupDate: string;
  deliveryDate: string;
}

export interface FormErrors {
  senderName?: string;
  receiverName?: string;
  senderAddress?: string;
  receiverAddress?: string;
  packageSize?: string;
  packageWeight?: string;
  pickupDate?: string;
  deliveryDate?: string;
}
