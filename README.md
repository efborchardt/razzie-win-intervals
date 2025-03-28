# Golden Raspberry Awards API

Welcome to the **razzie-win-intervals** project! This project provides a RESTful API that allows you to query the list of nominees and winners for the **Worst Film** category of the **Golden Raspberry Awards (Razzies)**.

## Project Overview

The **razzie-win-intervals** application is designed to:

1. Read a CSV file containing information about the Golden Raspberry Awards and load the data into an in-memory database (using SQLite).
2. Expose an API to:
   - Retrieve the producer with the longest interval between consecutive wins.
   - Retrieve the producer with the fastest consecutive wins.
   - Retrieve all Golden Raspberry Awards movies available in database.

### Features:
- Read CSV data into an in-memory database upon application startup.
- Retrieve data about the longest and fastest winning intervals for producers.
- No external installation is required—everything runs from within the project.
- Test integration to ensure the accuracy of the data provided by the API.

## Tech Stack

This project was developed using the following technologies:

- **Node.js**
- **TypeScript** Used for type safety and better code quality.
- **SQLite3** A lightweight, in-memory database engine to store the CSV data.
- **Sequelize** ORM (Object-Relational Mapping) for interacting with the SQLite3 database.
- **Express** Web framework for building the RESTful API.
- **Jest** Testing framework for running integration tests.
- **Supertest** HTTP assertions for testing API routes.

## Requirements

- **Node.js:** Version 22.14.0 or later.
- **NPM (Node Package Manager):** Version 10.9.2 or later.
- **Docker** (optional) if you prefer to run the project in a containerized environment.

## Running the Project

You can run the project either **directly on your machine** or using **Docker**.

### Option 1: Running Locally

Follow these steps to set up and run the project on your local machine.

#### 1. Clone the repository
```bash
git clone https://github.com/efborchardt/razzie-win-intervals.git
```

#### 2. Install dependencies
Navigate to the project directory and install the dependencies:
```bash
cd razzie-win-intervals
npm install
```

#### 3. Start the application
To run the application:
```bash
npm start
```
The application will load the CSV data into the SQLite3 database and start the RESTful API.

#### 4. Run tests
To run the integration tests:
```bash
npm test
```
This will execute the integration tests and ensure the correctness of the data exposed by the API.

---

### Option 2: Running with Docker Compose

If you prefer to run the project using **Docker Compose**, follow these steps.

#### 1. Start the development environment
```bash
docker-compose up api-dev
```
This will build (if needed) and start the API with hot-reload inside a Docker container, exposing it on port **3000**.

#### 2. Managing container
Stop and remove containers when done:
```bash
docker-compose down
```

--- 

## API Endpoints

### 1. Get the Longest and Fastest Consecutive Award Intervals
**Endpoint:** `/api/producers-intervals`  
**Method:** GET  
This endpoint returns the producers with the longest interval between two consecutive awards (max), and the ones who obtained two awards the fastest (min).

**Response format:**
```json
{
	"min": [
		{
			"producer": "Producer name",
			"interval": 1,
			"previousWin": 1990,
			"followingWin": 1991
		}
	],
	"max": [
		{
			"producer": "Producer name",
			"interval": 10,
			"previousWin": 2000,
			"followingWin": 2010
		}
	]
}
```

### 2. Get All Movies
**Endpoint:** `/api/movies`
**Method:** GET  
This endpoint returns all Golden Raspberry Awards movies available in database

**Response format:**
```json
[
	{
		"title": "Movie title",
		"studios": "Movie studio name",
		"year": 1980,
		"winner": true, // true: if won the award; false: if did not win the award;
		"producers": ["Producer 1","Producer 2"]
	},
]
```

---
