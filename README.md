# Marketplace Backend API

Backend API untuk aplikasi marketplace sederhana menggunakan node.js. 

## API Documentation
Gunakan Swagger untuk melihat dan mencoba endpoint secara langsung.

## Fitur
- Authentication register & Login (JWT)
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
- Multer
- Swagger
- JWT

## Cara Menjalankan Project
### 
1. Clone Repository
```bash
git clone
https://github.com/dmas43917-rdr2/marketplace-backend.git
cd repo

2. Install Dependency
npm install

3.Setup Environment
buat file .env

```env
PORT=3000
DB_URL=your_postgresql_url
JWT_SECRET=your_secret_key

4. Jalankan Server
npm run dev

5. Buka Swagger Documentation
http://localhost:3000/api-docs

## Endpoints
### auth
- `POST /register` -> Register user
- `POST /login` -> Login user

### products
- `GET /products` -> Get all products
- `POST /products` -> Create product
- `GET /products/:id` -> Get product detail
- `PUT /products/:id` -> Update product
- `DELETE /product/:id` -> Delete product
- `GET /my-products` -> Get user products

### Orders
- `POST /orders` -> Create order
- `GET /orders` -> Get all orders 
- `GET /my-orders` -> Get user orders

## API Example
### GET /products
Request
GET /products?page=1&limit=10&search=sepatu

Response
{
  "page": 1,
  "limit": 10,
  "data": [
    {
       "id": 1,
       "name": "sepatu",
       "price": 10000,
       "image_url": "http://localhost:3000/uploads/sepatu.jpg"
       }
  ]
}

### POST /login
Request
POST /login
{
    "email": "user@gmail.com",
    "password": "123456"
}

Response
{
   "token": "jwt_token"
}

