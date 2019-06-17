export class Shipment {
  id?: number;
  truckType?: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryZip?: string;
  deliveryCountry?: string;
  deliveryLatitude?: string;
  deliveryLongitude?: string;
  pickupAddress?: string;
  pickupCity?: string;
  pickupState?: string;
  pickupZip?: string;
  pickupCountry?: string;
  pickupLatitude?: string;
  pickupLongitude?: string;
  pickupDelivery_date?: string;
  pickupEndDate?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverPhone?: string;
  cost?: number;
}
