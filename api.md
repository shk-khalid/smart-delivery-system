
---

# 🚚 Smart Delivery Management System - API Documentation

Welcome to the **Smart Delivery Management System API**! This guide will help you interact with our backend services to manage delivery partners, orders, and assignments. Let’s dive in! 🎉

> **Live Demo:** [Smart Delivery Management System](https://smart-delivery-system.vercel.app/)  
> **Tech Stack:** Django REST Framework, PostgreSQL

---

## 🌐 Base URL

```
http://yourdomain.com/api/
```

---

## 🔓 Authentication

**No authentication is required for accessing this API.** All endpoints are public—so feel free to start testing immediately! 🚀

---

## 📚 Endpoints Overview

- [Delivery Partners](#delivery-partners)
- [Orders](#orders)
- [Assignments](#assignments)
- [Assignment Metrics](#assignment-metrics)
- [Run Assignment Algorithm](#run-assignment-algorithm)
- [Error Responses](#error-responses)

---

## 👥 Delivery Partners

### Get All Delivery Partners

**Endpoint:**  
```
GET /partners/
```

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "status": "active",
    "current_load": 2,
    "areas": ["Downtown", "Uptown"],
    "shift_start": "09:00",
    "shift_end": "18:00",
    "rating": 4.5,
    "completed_orders": 50,
    "cancelled_orders": 2
  }
]
```

---

### Create a New Delivery Partner

**Endpoint:**  
```
POST /partners/
```

**Payload:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "status": "active",
  "areas": ["Downtown", "Uptown"],
  "shift_start": "08:00",
  "shift_end": "16:00"
}
```

**Response Example:**
```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "status": "active",
  "current_load": 0,
  "areas": ["Downtown", "Uptown"],
  "shift_start": "08:00",
  "shift_end": "16:00",
  "rating": 0,
  "completed_orders": 0,
  "cancelled_orders": 0
}
```

> **Tip:**  
> You can also retrieve, update, or delete a specific partner using:  
> - `GET /partners/{id}/`  
> - `PUT/PATCH /partners/{id}/`  
> - `DELETE /partners/{id}/`  
> Happy managing! 👌

---

## 📦 Orders

### Get All Orders

**Endpoint:**  
```
GET /orders/
```

**Optional Query Parameters:**
- `status` — Filter orders by status (`pending`, `assigned`, `picked`, `delivered`)
- `area` — Filter orders by delivery area
- `date` — Filter orders by creation date (format: YYYY-MM-DD)

**Response Example:**
```json
[
  {
    "id": 101,
    "order_number": "ORD12345",
    "customer_name": "Alice",
    "customer_phone": "1234567890",
    "delivery_area": "Downtown",
    "items": [
      {"name": "Laptop", "quantity": 1, "price": 1000}
    ],
    "status": "pending",
    "scheduled_time": "2025-03-15T14:00:00Z",
    "assigned_to": null,
    "total_amount": "1000.00",
    "position": [40.7128, -74.0060],
    "created_at": "2025-03-14T10:00:00Z",
    "last_updated": "2025-03-14T10:00:00Z"
  }
]
```

---

### Assign an Order to a Delivery Partner

This endpoint assigns a pending order to an available partner based on active status, current load (< 3), and matching service area. 🤖

**Endpoint:**  
```
POST /orders/assign/
```

**Payload:**
```json
{
  "order_id": 101
}
```

**Response Example (Success):**
```json
{
  "id": 5,
  "timestamp": "2025-03-14T11:00:00Z",
  "status": "success",
  "orderId": "ORD12345",
  "partnerId": "2",
  "orderDetails": {
    "items": ["Laptop"],
    "total": 1000.0,
    "destination": "Downtown"
  },
  "partnerDetails": {
    "name": "Jane Doe",
    "phone": "9876543210",
    "rating": 0.0
  }
}
```

**Response Example (Failure):**
```json
{
  "id": 6,
  "timestamp": "2025-03-14T11:05:00Z",
  "status": "failed",
  "orderId": "ORD12345",
  "partnerId": null,
  "orderDetails": {
    "items": ["Laptop"],
    "total": 1000.0,
    "destination": "Downtown"
  },
  "partnerDetails": null,
  "reason": "No available partner matching criteria (active, under load, correct area)"
}
```

> **Extra Info:**  
> Other useful order endpoints include:  
> - **Retrieve/Update a Specific Order:** `GET/PUT/PATCH /orders/{id}/`  
> - **Delete an Order:** `DELETE /orders/{id}/` (Only if order status is `pending`)  
> - **Bulk Delete Orders:** `DELETE /orders/bulk_delete/`  
> - **Update Order Status:** `PUT /orders/{id}/status/`  
> - **Get Order Trends:** `GET /orders/trends/?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`  
> Keep exploring! 🚀

---

## 🔄 Assignments

### Get All Assignments

**Endpoint:**  
```
GET /assignments/
```

**Response Example:**
```json
[
  {
    "id": 5,
    "timestamp": "2025-03-14T11:00:00Z",
    "status": "success",
    "orderId": "ORD12345",
    "partnerId": "2",
    "orderDetails": {
      "items": ["Laptop"],
      "total": 1000.0,
      "destination": "Downtown"
    },
    "partnerDetails": {
      "name": "Jane Doe",
      "phone": "9876543210",
      "rating": 0.0
    }
  }
]
```

> **Quick Note:**  
> Retrieve a specific assignment with `GET /assignments/{id}/`. Enjoy tracking your assignments! 📊

---

## 📈 Assignment Metrics

### Get Assignment Metrics

This endpoint provides the latest metrics for your order assignments, including total assignments, success rate, average assignment time, and more! ⏱️

**Endpoint:**  
```
GET /assignments-metrics/
```

**Response Example:**
```json
{
  "total_assigned": 100,
  "success_rate": 95.0,
  "average_time": 5.2,
  "failure_reasons": [
    {"reason": "No available partner matching criteria (active, under load, correct area)", "count": 3},
    {"reason": "Error during assignment update: [error details]", "count": 2}
  ],
  "historical_data": [
    {
      "timestamp": "2025-03-10T00:00:00Z",
      "success_rate": 94.5,
      "average_time": 5.1,
      "total_assigned": 50
    },
    {
      "timestamp": "2025-03-11T00:00:00Z",
      "success_rate": 95.0,
      "average_time": 5.2,
      "total_assigned": 50
    }
  ]
}
```

> **Did You Know?**  
> This data helps you monitor and improve your delivery performance over time! 📊

---

## ⚙️ Run Assignment Algorithm

This endpoint triggers the order assignment process for all pending orders. It updates order statuses and recalculates metrics automatically. Ready, set, assign! 🚀

**Endpoint:**  
```
POST /assignments-run/
```

**Payload:**  
_No payload required._

**Response Example:**
```json
{
  "total_assigned": 3,
  "success_rate": 75.0,
  "average_time": 50.2,
  "failure_reasons": [
    {"reason": "No available partner matching criteria (active, under load, correct area)", "count": 2}
  ],
  "historical_data": [
    {
      "timestamp": "2025-03-13T10:00:00Z",
      "success_rate": 80.0,
      "average_time": 40.5,
      "total_assigned": 4
    }
  ]
}
```

> **Heads Up:**  
> This process recalculates all metrics based on the current pending orders. Check back later for updated performance insights! 📈

---

## ❌ Error Responses

In case of any errors, the API returns a JSON object with a `detail` field:

```json
{
  "detail": "Error message here."
}
```

**Common HTTP Status Codes:**

- **200 OK:** Successful request. ✅
- **400 Bad Request:** Invalid input or missing parameters. ⚠️
- **404 Not Found:** Resource does not exist. 🔍
- **500 Internal Server Error:** Unexpected server error. 💥

---

## 🎉 Conclusion

Thank you for exploring the **Smart Delivery Management System API**! We hope this interactive guide makes it easy for you to integrate with our platform and manage your delivery operations efficiently. If you have any questions or need further assistance, please refer to our [Live Demo](https://smart-delivery-system.vercel.app/) or reach out via the contact details provided in the repository.

Happy coding and efficient deliveries! 🚚✨

---