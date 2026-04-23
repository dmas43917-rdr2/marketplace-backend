# Marketplace Backend API

## Fitur
- Register & Login (JWT)
- CRUD Produk
- Authorization (produk milik sendiri)
- Order (beli produk)
- Validasi order:
  - Tidak bisa beli produk sendiri
  - Tidak bisa beli produk  yang sama 2x
- Order history (my orders)
- Relasi database (join)
- Pagination & search products
- Sorting products (price asc/desc,newest)
- Upload image for products and url for response
- Update product with image
- Image validation (type & size limit)
- Role-based acces (admin & user)
- API documentation with Swagger (/api-docs)

## Tech Stack 
- Node.js
- Express
- ProstgreSQL

## Cara Menjalankan
npm install
npm run dev

## Endpoint
- POST /register -> register user
- POST /login -> login user
- GET /products -> get all products
- POST /products -> create product
- GET /my-products -> get user products
- POST /orders -> create order
- GET /orders -> get all orders 
- GET /my-orders -> get user orders

