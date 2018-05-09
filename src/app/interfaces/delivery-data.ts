/**
 * Delivery data type declaration.
 * Used on checkout and in orders.
 */
export interface DeliveryData {
  email: string;
  fullName: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
}
