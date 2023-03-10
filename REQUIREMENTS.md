# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/api/products/' [GET]
- Show '/api/products/:id' [GET]
- Create [token required] '/api/products' [POST]
- Update [token required] '/api/products/:id' [PUT]
- Delete [token required] '/api/products/:id' [DELETE]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] '/api/users' [GET]
- Show [token required] '/api/users/:id' [GET]
- Create returns token '/api/users/create' [POST]
- Login returns token '/api/users/login' [POST]
- Update [token required] 'api/users/:id' [PUT]
- Delete [token required] 'api/users/:id' [DELETE]

#### Orders
- Order by user (args: user id)[token required] '/api/orders/user_id/:user_id' [GET]
- Current order by user (args: user id) [token required] '/api/orders/:id' [GET]
- Update [token required] '/api/orders/:id' [PUT]
- Delete [token required] '/api/orders/:id' [DELETE]
- Product to order (args: quantity, orderId, productId) [token required] '/api/orders/:id/products' [POST]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- first_name
- last_name
- username
- password_digest

#### Orders
- id
- status (active or complete)
- user_id

#### order_products
- id
- quantity
- order_id
- product_id

