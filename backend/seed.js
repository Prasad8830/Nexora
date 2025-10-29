const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics',
    stock: 50
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'Electronics',
    stock: 30
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    description: 'Durable laptop backpack with USB charging port and water-resistant material',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'Accessories',
    stock: 75
  },
  {
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Portable Bluetooth speaker with 360° sound and waterproof design',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    category: 'Electronics',
    stock: 60
  },
  {
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB mechanical gaming keyboard with customizable keys and tactile switches',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    category: 'Electronics',
    stock: 40
  },
  {
    name: 'Wireless Mouse',
    price: 34.99,
    description: 'Ergonomic wireless mouse with adjustable DPI and rechargeable battery',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    category: 'Electronics',
    stock: 100
  },
  {
    name: 'USB-C Hub',
    price: 44.99,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80',
    category: 'Accessories',
    stock: 85
  },
  {
    name: 'Phone Stand',
    price: 19.99,
    description: 'Adjustable phone stand with cable management for desk or bedside',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80',
    category: 'Accessories',
    stock: 120
  },
  {
    name: 'Webcam HD',
    price: 89.99,
    description: '1080p HD webcam with autofocus and built-in microphone',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80',
    category: 'Electronics',
    stock: 45
  },
  {
    name: 'Cable Organizer Set',
    price: 14.99,
    description: 'Complete cable management set with clips, sleeves, and ties',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
    category: 'Accessories',
    stock: 150
  },
  {
    name: '4K Monitor 27"',
    price: 349.99,
    description: 'Ultra HD 4K monitor with HDR support and 144Hz refresh rate',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    category: 'Electronics',
    stock: 25
  },
  {
    name: 'Gaming Chair',
    price: 299.99,
    description: 'Ergonomic gaming chair with lumbar support and adjustable armrests',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80',
    category: 'Furniture',
    stock: 20
  },
  {
    name: 'Desk Lamp LED',
    price: 39.99,
    description: 'Modern LED desk lamp with touch control and adjustable brightness',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    category: 'Accessories',
    stock: 90
  },
  {
    name: 'External SSD 1TB',
    price: 119.99,
    description: 'High-speed portable SSD with USB 3.2 Gen 2 for fast file transfers',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80',
    category: 'Electronics',
    stock: 55
  },
  {
    name: 'Laptop Cooling Pad',
    price: 29.99,
    description: 'Silent cooling pad with 5 fans and adjustable height settings',
    image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=500&q=80',
    category: 'Accessories',
    stock: 80
  },
  {
    name: 'Wireless Earbuds Pro',
    price: 159.99,
    description: 'True wireless earbuds with active noise cancellation and premium sound',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    category: 'Electronics',
    stock: 65
  },
  {
    name: 'Graphics Tablet',
    price: 89.99,
    description: 'Digital drawing tablet with 8192 pressure levels and battery-free pen',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&q=80',
    category: 'Electronics',
    stock: 35
  },
  {
    name: 'Ring Light 12"',
    price: 44.99,
    description: 'Dimmable LED ring light with tripod stand for photography and videos',
    image: 'https://images.unsplash.com/photo-1598134493474-6d9b7a89d45e?w=500&q=80',
    category: 'Accessories',
    stock: 70
  },
  {
    name: 'Power Bank 20000mAh',
    price: 39.99,
    description: 'Fast-charging power bank with dual USB ports and LED display',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80',
    category: 'Electronics',
    stock: 110
  },
  {
    name: 'Monitor Arm Mount',
    price: 54.99,
    description: 'Adjustable dual monitor arm with cable management and gas spring',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    category: 'Accessories',
    stock: 40
  },
  {
    name: 'Smart LED Bulbs (4-Pack)',
    price: 49.99,
    description: 'WiFi-enabled color-changing LED bulbs compatible with Alexa and Google Home',
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&q=80',
    category: 'Electronics',
    stock: 95
  },
  {
    name: 'Desk Mat XXL',
    price: 24.99,
    description: 'Extra large waterproof desk mat with smooth surface for mouse and keyboard',
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500&q=80',
    category: 'Accessories',
    stock: 130
  },
  {
    name: 'USB Microphone',
    price: 79.99,
    description: 'Professional condenser microphone with pop filter for podcasting and streaming',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80',
    category: 'Electronics',
    stock: 50
  },
  {
    name: 'Laptop Stand Aluminum',
    price: 34.99,
    description: 'Ergonomic aluminum laptop stand with heat dissipation design',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    category: 'Accessories',
    stock: 85
  }
];

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vibe-commerce';
    
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✓ Inserted ${insertedProducts.length} products`);

    console.log('\n📦 Products seeded successfully!');
    console.log('\nSample products:');
    insertedProducts.slice(0, 3).forEach(product => {
      console.log(`  - ${product.name}: $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
