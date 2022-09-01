# TECHATHON NODE.JS TRACK GROUP PROJECT

## PROJECT

An API for a Cake Vendor(JP Bakery).

## DESCRIPTION

This API will allow users with a **"admin"** role to _add, approve, update or remove_ **Orders**, while users with a **"buyer"** role can _order/request_ for cakes.

## FEATURES

1. Implement an authentication method using JWT /auth/login, /auth/register & /auth/refreshToken, POST /auth/register & /auth/login should not require authentication to allow new user registration.
2. Implement CRUD for User model (GET, POST, PUT and DELETE /users. Only admin is allowed to create and delete all types of user).
3. Implement CRUD for a Order model (GET, POST, PUT and DELETE /orders, User with buyer role can create, read, update and delete order for that specific user only. Admin can create, read, update and delete any order)
4. User should send a POST request to /orders for requesting/ordering a cake with the necessary data of cake(name,size,color and deliveryDate). You're to return back a 201 status with the newly created Order, amount(generated based on the cake size, quantity and other factors by you) and payment ref generated.
5. User with the "admin" role should be able to approve or reject an order.
6. Implement CRUD for a Payment model (GET, POST, PUT and DELETE /payments, User with buyer role can read and update payment for a specific order by that user. Admin can create, read, update and delete any payment)
7. If somebody is already logged in with the same credentials, the user should be given a message "There is already an active session using your account". In this case the user should be able to terminate all the active sessions on their account via an endpoint i.e. auth/logout/all
8. Take time to think about possible edge cases and access issues that should be solved.

## SCHEMA

### USER

```
_id				-> ObjectId
username		-> String
email			-> String
password		-> String
address			-> String
role 			-> String - Enums ["admin", "buyer"]
refreshToken	-> [String]
createdAt		-> Date
updatedAt		-> Date
```

### ORDER

```
_id				    -> ObjectId
cakeName			-> String
cakeColor			-> String
cakeSize			-> String - Enums ["small", "medium", "large"]
deliveryDate		-> Date
userId			    -> User(_id) ref
qty				    -> Number
price				-> Number
status			    -> String - Enums ["pending", "approved", "rejected", "delivered"]
createdAt			-> Date
updatedAt			-> Date
```

## PAYMENT

```
_id				-> ObjectId
orderId			-> Order(_id)
ref				-> String
amount			-> Number
status			-> String - Enums ["unpaid", "paid"]
createdAt		-> Date
updatedAt		-> Date
```
