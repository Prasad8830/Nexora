# API Testing Guide

Test the Vibe Commerce API using these commands.

## Prerequisites

- Backend server running on http://localhost:5000
- MongoDB running and database seeded

## Base URL

```
http://localhost:5000/api
```

## Test Endpoints

### 1. Health Check

```powershell
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Vibe Commerce API is running",
  "timestamp": "2025-10-28T..."
}
```

### 2. Get All Products

```powershell
curl http://localhost:5000/api/products
```

Should return 10 products with details.

### 3. Get Single Product

First get a product ID from the products list, then:

```powershell
curl http://localhost:5000/api/products/PRODUCT_ID_HERE
```

### 4. Get Cart

```powershell
curl http://localhost:5000/api/cart
```

### 5. Add to Cart

Replace `PRODUCT_ID` with an actual product ID:

```powershell
curl -X POST http://localhost:5000/api/cart `
  -H "Content-Type: application/json" `
  -d '{\"productId\":\"PRODUCT_ID\",\"quantity\":2}'
```

### 6. Update Cart Item

Replace `ITEM_ID` with the cart item ID:

```powershell
curl -X PUT http://localhost:5000/api/cart/ITEM_ID `
  -H "Content-Type: application/json" `
  -d '{\"quantity\":5}'
```

### 7. Remove from Cart

```powershell
curl -X DELETE http://localhost:5000/api/cart/ITEM_ID
```

### 8. Checkout

```powershell
curl -X POST http://localhost:5000/api/checkout `
  -H "Content-Type: application/json" `
  -d '{\"customerName\":\"John Doe\",\"customerEmail\":\"john@example.com\"}'
```

### 9. Get All Orders

```powershell
curl http://localhost:5000/api/checkout/orders
```

### 10. Get Single Order

```powershell
curl http://localhost:5000/api/checkout/orders/ORDER_ID
```
