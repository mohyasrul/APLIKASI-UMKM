import Dexie, { Table } from 'dexie';
import { Product, ProductCategory } from '@/lib/types/product';
import { Customer, Sale, SaleItem, Payment } from '@/lib/types/sales';
import { User } from '@/lib/types/common';

export interface StockMovement {
  id?: number;
  productId: string;
  locationId: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  costPerUnit: number;
  totalCost: number;
  referenceType: 'purchase' | 'sale' | 'transfer' | 'adjustment';
  referenceId: string;
  notes?: string;
  createdAt: Date;
}

interface ImportData {
  users?: User[];
  categories?: ProductCategory[];
  products?: Product[];
  customers?: Customer[];
  sales?: Sale[];
  saleItems?: SaleItem[];
  payments?: Payment[];
  stockMovements?: StockMovement[];
}

export interface OfflineTransaction {
  id?: number;
  type: 'sale' | 'stock_movement' | 'customer_update';
  data: Record<string, unknown>; // Changed from any to be more specific
  timestamp: Date;
  synced: boolean;
  retryCount: number;
}

class UMKMDatabase extends Dexie {
  // Tables for offline-first functionality
  users!: Table<User>;
  categories!: Table<ProductCategory>;
  products!: Table<Product>;
  customers!: Table<Customer>;
  sales!: Table<Sale>;
  saleItems!: Table<SaleItem>;
  payments!: Table<Payment>;
  stockMovements!: Table<StockMovement>;
  offlineTransactions!: Table<OfflineTransaction>;

  constructor() {
    super('UMKMDatabase');

    this.version(1).stores({
      users: '++id, username, email, role, isActive, createdAt',
      categories: '++id, name, parentId, isActive, createdAt',
      products: '++id, name, sku, barcode, categoryId, isActive, createdAt',
      customers:
        '++id, name, email, phone, type, category, isActive, createdAt',
      sales:
        '++id, customerId, saleNumber, date, totalAmount, status, cashierId',
      saleItems: '++id, saleId, productId, quantity, unitPrice, totalPrice',
      payments: '++id, saleId, method, amount, status, processedAt',
      stockMovements:
        '++id, productId, locationId, type, referenceType, createdAt',
      offlineTransactions: '++id, type, timestamp, synced, retryCount',
    });
  }
  // Utility methods for common operations
  async addOfflineTransaction(
    type: OfflineTransaction['type'],
    data: Record<string, unknown>
  ) {
    return await this.offlineTransactions.add({
      type,
      data,
      timestamp: new Date(),
      synced: false,
      retryCount: 0,
    });
  }
  async getPendingSync() {
    return await this.offlineTransactions.filter(tx => !tx.synced).toArray();
  }

  async markAsSynced(id: number) {
    return await this.offlineTransactions.update(id, { synced: true });
  }

  async getProductWithStock(productId: string) {
    const product = await this.products.get(productId);
    if (!product) return null;

    // Calculate current stock from stock movements
    const movements = await this.stockMovements
      .where('productId')
      .equals(productId)
      .toArray();

    const totalStock = movements.reduce((total, movement) => {
      return movement.type === 'in'
        ? total + movement.quantity
        : total - movement.quantity;
    }, 0);

    return {
      ...product,
      currentStock: totalStock,
    };
  }

  async getCustomerSales(customerId: string) {
    return await this.sales
      .where('customerId')
      .equals(customerId)
      .reverse()
      .toArray();
  }

  async getDailySales(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await this.sales
      .where('date')
      .between(startOfDay, endOfDay)
      .toArray();
  }

  // Backup and restore methods
  async exportData() {
    const data = {
      users: await this.users.toArray(),
      categories: await this.categories.toArray(),
      products: await this.products.toArray(),
      customers: await this.customers.toArray(),
      sales: await this.sales.toArray(),
      saleItems: await this.saleItems.toArray(),
      payments: await this.payments.toArray(),
      stockMovements: await this.stockMovements.toArray(),
      exportDate: new Date().toISOString(),
    };
    return data;
  }
  async importData(data: ImportData) {
    await this.transaction(
      'rw',
      [
        this.users,
        this.categories,
        this.products,
        this.customers,
        this.sales,
        this.saleItems,
        this.payments,
        this.stockMovements,
      ],
      async () => {
        // Clear existing data
        await this.users.clear();
        await this.categories.clear();
        await this.products.clear();
        await this.customers.clear();
        await this.sales.clear();
        await this.saleItems.clear();
        await this.payments.clear();
        await this.stockMovements.clear();

        // Import new data
        if (data.users) await this.users.bulkAdd(data.users);
        if (data.categories) await this.categories.bulkAdd(data.categories);
        if (data.products) await this.products.bulkAdd(data.products);
        if (data.customers) await this.customers.bulkAdd(data.customers);
        if (data.sales) await this.sales.bulkAdd(data.sales);
        if (data.saleItems) await this.saleItems.bulkAdd(data.saleItems);
        if (data.payments) await this.payments.bulkAdd(data.payments);
        if (data.stockMovements)
          await this.stockMovements.bulkAdd(data.stockMovements);
      }
    );
  }
}

export const db = new UMKMDatabase();
