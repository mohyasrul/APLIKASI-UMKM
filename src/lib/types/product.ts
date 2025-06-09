import { BaseEntity } from './common';

export interface Product extends BaseEntity {
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  images: string[];
  priceBuy: number;
  priceSell: number;
  margin: number;
  unit: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isActive: boolean;
  stockMinimum: number;
  isTrackStock: boolean;
  tags: string[];
}

export interface ProductCategory extends BaseEntity {
  name: string;
  description?: string;
  parentId?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
}

export interface ProductUnit extends BaseEntity {
  productId: string;
  unitName: string;
  conversionRate: number;
  priceSell: number;
  isDefault: boolean;
}

export interface ProductVariant extends BaseEntity {
  productId: string;
  name: string;
  value: string;
  priceBuy: number;
  priceSell: number;
  sku: string;
  barcode?: string;
  isActive: boolean;
}

export interface Stock extends BaseEntity {
  productId: string;
  locationId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  averageCost: number;
  lastStockUpdate: Date;
}

export interface StockMovement extends BaseEntity {
  productId: string;
  locationId: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  costPerUnit: number;
  totalCost: number;
  referenceType: 'purchase' | 'sale' | 'transfer' | 'adjustment';
  referenceId: string;
  notes?: string;
}
