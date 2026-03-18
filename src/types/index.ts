export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  unit: string;
  location: string;
  farmerId: string;
  farmerName: string;
  image: string;
  description: string;
  organic: boolean;
  rating: number;
  deliveryAreas: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'farmer' | 'customer';
  location: string;
}

export interface Order {
  id: string;
  productId: string;
  customerId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: Date;
  deliveryAddress: string;
}