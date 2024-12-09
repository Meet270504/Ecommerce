const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Get database file path from environment or use default
const DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, 'db', 'database.sqlite');

// Connect to the database
const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log(`Connected to SQLite database at ${DATABASE_PATH}`);
    }
});

// Initialize tables
const schema = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
`;

// Execute schema initialization
db.exec(schema, (err) => {
    if (err) {
        console.error('Error initializing database schema:', err.message);
    } else {
        console.log('Database schema initialized.');
    }
});

// Insert sample products if enabled
if (process.env.LOAD_SAMPLE_DATA === 'true') {
    const sampleProducts = `
    INSERT OR IGNORE INTO products (name, price, image) VALUES
    ('Laptop', 1000.0, 'laptop.webp'),
    ('Headphones', 300.0, 'headphones.webp'),
    ('Ipad', 400.0, 'ipad.webp'),
    ('Smartphone', 800.0, 'phone.webp'),
    ('Smartwatch', 150.0, 'smartwatch.webp'),
    ('Hoodie', 50.0, 'hoodie.webp'),
    ('Sneakers', 120.0, 'sneakers.webp'),
    ('Jacket', 200.0, 'jacket.webp'),
    ('Sunglasses', 100.0, 'sunglasses.webp'),
    ('Backpack', 75.0, 'backpack.webp'),
    ('Camera', 500.0, 'camera.webp'),
    ('Water Bottle', 25.0, 'water-bottle.webp');
    `;

    db.exec(sampleProducts, (err) => {
        if (err) {
            console.error('Error inserting sample products:', err.message);
        } else {
            console.log('Sample products added to the database.');
        }
    });
}

module.exports = db;