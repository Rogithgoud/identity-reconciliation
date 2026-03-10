# Identity Reconciliation API

This project implements the Bitespeed Backend Task for identifying and reconciling customer identities across multiple purchases.

## Live API
https://identity-reconciliation-gbdb.onrender.com

## Endpoint

POST /identify

### Request Body
{
  "email": "string",
  "phoneNumber": "string"
}

### Response
{
  "contact": {
    "primaryContactId": number,
    "emails": [],
    "phoneNumbers": [],
    "secondaryContactIds": []
  }
}

## Tech Stack
- Node.js
- Express.js
- Prisma ORM
- SQLite
- Render Deployment