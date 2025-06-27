# Platformatory Labs Assignment



## Project Overview

This project is a full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js), with **Temporal.io** integrated to ensure **guaranteed response delivery** for critical backend workflows.

### Features

* User authentication (Login & Registration)
* Secure user profile update functionality
* Reliable, fault-tolerant backend workflow powered by Temporal.io

### Problem it Solves

In many web apps, ensuring a response is reliably sent—especially during critical operations like user updates—can be challenging due to backend failures or retries. By integrating **Temporal.io**, this app guarantees delivery and execution of backend logic, reducing data inconsistency and improving system resilience.


### Installation & Running Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Setup Environment Variables

* Create a `.env` file in the root directory.
* Copy values from `.env.example` and fill in the appropriate configuration.

```bash
cp .env.example .env
```

Make sure to add environment variables such as:

* `MONGO_URI`
* `JWT_SECRET`
* `TEMPORAL_ADDRESS`
* Any other required values

### 3. Set Up Temporal.io Locally

To run Temporal locally:

* Clone the [Temporal GitHub repository](https://github.com/temporalio/docker-compose)
* Navigate into the directory and start Temporal using Docker Compose:

```bash
docker-compose up
```

> This will spin up Temporal's core services including the Web UI on `http://localhost:8233`.

### 4. Install Dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

### 5. Run the App

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm start
```

---

## Tech Stack

* **Frontend:** React, Axios, Bootstrap
* **Backend:** Node.js, Express, MongoDB, JWT
* **Workflow Engine:** Temporal.io
* **Tooling:** Docker (for Temporal), dotenv




# Images
![HomePage](/a.jpg)