import { BaseEntity } from './common';

export interface Customer extends BaseEntity {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  type: 'individual' | 'company';
  category: 'regular' | 'vip' | 'wholesale';
  creditLimit: number;
  currentCredit: number;
  totalPurchases: number;
  lastPurchase?: Date;
  loyaltyPoints: number;
  birthday?: Date;
  anniversary?: Date;
  taxId?: string;
  isActive: boolean;
  notes?: string;
}

export interface Sale extends BaseEntity {
  customerId?: string;
  saleNumber: string;
  date: Date;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  cashierId: string;
  notes?: string;
  receiptPrinted: boolean;
}

export interface SaleItem extends BaseEntity {
  saleId: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  totalPrice: number;
  costPrice: number;
  margin: number;
}

export interface Payment extends BaseEntity {
  saleId: string;
  method: 'cash' | 'card' | 'transfer' | 'ewallet' | 'qris';
  amount: number;
  reference?: string;
  accountId?: string;
  status: 'pending' | 'completed' | 'failed';
  processedAt?: Date;
}

export interface Refund extends BaseEntity {
  saleId: string;
  originalSaleId: string;
  reason: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'rejected';
  processedBy: string;
  processedAt?: Date;
  notes?: string;
}
