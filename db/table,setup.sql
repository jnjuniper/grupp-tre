CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT,
    price NUMBER,
    image TEXT,
    secondaryImage1 TEXT,
    secondaryImage2 TEXT,
    secondaryImage3 TEXT,
    brand TEXT,
    productDescription TEXT,
    isNew TEXT,
    category TEXT
);



CREATE TABLE IF NOT EXISTS hero_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL
);
