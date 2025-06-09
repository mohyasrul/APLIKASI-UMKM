import Database from 'better-sqlite3';
import path from 'path';
// import { app } from 'electron'; // TODO: Remove when not using Electron

// For now, we'll use a simple file-based approach
// In a real PWA, this would be handled differently
export class LocalDatabase {
  private db: Database.Database | null = null;
  private dbPath: string;

  constructor() {
    // For development, store in project root
    this.dbPath =
      process.env.NODE_ENV === 'production'
        ? path.join(process.cwd(), 'data', 'umkm.db')
        : path.join(process.cwd(), 'umkm-dev.db');
  }

  async initialize() {
    try {
      this.db = new Database(this.dbPath);
      await this.createTables();
      console.log('SQLite database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private async createTables() {
    if (!this.db) throw new Error('Database not initialized');

    // Users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'cashier',
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `);

    // Categories table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        parent_id TEXT,
        icon TEXT,
        color TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id)
      )
    `);

    // Products table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        sku TEXT UNIQUE NOT NULL,
        barcode TEXT UNIQUE,
        category_id TEXT,
        images TEXT, -- JSON array
        price_buy DECIMAL(10,2) NOT NULL,
        price_sell DECIMAL(10,2) NOT NULL,
        margin DECIMAL(5,2),
        unit TEXT NOT NULL DEFAULT 'pcs',
        weight DECIMAL(8,3),
        dimensions TEXT, -- JSON object
        is_active BOOLEAN DEFAULT 1,
        stock_minimum INTEGER DEFAULT 0,
        is_track_stock BOOLEAN DEFAULT 1,
        tags TEXT, -- JSON array
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);

    // Customers table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        address TEXT,
        city TEXT,
        postal_code TEXT,
        type TEXT DEFAULT 'individual',
        category TEXT DEFAULT 'regular',
        credit_limit DECIMAL(12,2) DEFAULT 0,
        current_credit DECIMAL(12,2) DEFAULT 0,
        total_purchases DECIMAL(12,2) DEFAULT 0,
        last_purchase DATETIME,
        loyalty_points INTEGER DEFAULT 0,
        birthday DATE,
        anniversary DATE,
        tax_id TEXT,
        is_active BOOLEAN DEFAULT 1,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Stock table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS stock (
        id TEXT PRIMARY KEY,
        product_id TEXT NOT NULL,
        location_id TEXT DEFAULT 'main',
        quantity INTEGER NOT NULL DEFAULT 0,
        reserved_quantity INTEGER DEFAULT 0,
        available_quantity INTEGER GENERATED ALWAYS AS (quantity - reserved_quantity) VIRTUAL,
        average_cost DECIMAL(10,2) DEFAULT 0,
        last_stock_update DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id),
        UNIQUE(product_id, location_id)
      )
    `);

    console.log('Database tables created successfully');
  }

  getDatabase() {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.db;
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const localDb = new LocalDatabase();
