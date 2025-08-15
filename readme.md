# Fullstack Developer Assessment – Laravel + Next.js

This repository contains a **fullstack application** built as part of a programming assessment.  
It includes a **Laravel backend** (with MySQL) and a **Next.js frontend**. Users can have multiple roles, and roles are dynamically fetched from the API. Frontend uses **TypeScript** and **ShadCN UI components**.

### ⚡ Notes

- **React Version Choice:** Requirement mentioned React 17, but React 17 is deprecated. Using **Next.js** provides routing, SSR, and modern optimizations.

- **Architecture:** Laravel repositories and services, with global exception handling.

- **Dockerized:** Easy setup and reproducibility.

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1️⃣ Start Application

```bash
docker-compose up --build
```

### 2️⃣ Access

Frontend: http://localhost:3000

Backend API: http://localhost:8000

Database: MySQL on port 3306
