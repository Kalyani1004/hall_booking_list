# Hall Booking Entry Management System

This is a web-based **Hall Booking System** that allows users to manage hall bookings. It provides the following functionalities:

- **Display the list of all bookings**
- **Accept new bookings**
- **Update and delete existing bookings**

## Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL

## Features

1. **Display Bookings**:
   - View a list of all bookings made, including applicant details and booking information.
   
2. **Accept New Bookings**:
   - Users can enter the details for a new booking including applicant name, email, time slot, rent, and other details.

3. **Update Existing Bookings**:
   - Users can update booking details like date, time slot, rent, etc.

4. **Delete Existing Bookings**:
   - Users can delete a booking by its ID.

## Requirements

### 1. **PostgreSQL**:
   - Install PostgreSQL to store and manage the booking data.

### 2. **Java**:
   - Java 11 or higher for the backend API (Spring Boot).
   
### 3. **Node.js**:
   - Node.js for running the React frontend.

### 4. **Maven**:
   - For managing Spring Boot dependencies.

## Setup Instructions

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/hall-booking-system.git
```

### 2. Setup the Backend (Spring Boot)

- **Install Java 11 or higher:**

  Download and install Java from [here](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).

- **Configure Database:**

  Install PostgreSQL and create a new database called `bookings`.

  In the `src/main/resources/application.properties` file of the backend, update the PostgreSQL connection details:


```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bookings
spring.datasource.username=your-username
spring.datasource.password=your-password
```

- **Run the Backend:**

   In the backend directory, use Maven to run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### 3. Setup the Frontend (React.js)
- **Install Node.js:**

   Download and install Node.js from here.

- **Install Dependencies:**

   Navigate to the frontend code directory and install the required npm dependencies:
   ```bash
   cd frontend_folder_name
   npm install
   ```
   
- **Run the Frontend:**

- **Start the React development server:**
   ```bash
   npm start
   ```
### 4. Access the Application
   Once everything is set up, you can use the hall booking system by visiting the following URLs:

  - Frontend URL: http://localhost:3000/
  - Backend API URL: http://localhost:8080/

   **API Endpoints**
   
   Here are the key API endpoints for managing bookings:

  - **GET /api/bookings**
      - Fetch all bookings.
   
  - **GET /api/bookings/{id}**
     - Fetch a booking by its ID.
   
  - **POST /api/bookings**
     -  Create a new booking.
   
  - **PUT /api/bookings/{id}**
     -  Update an existing booking by its ID.
   
  - **DELETE /api/bookings/{id}**
      - Delete a booking by its ID.


   ### 5. Database Schema
    
   Here's the schema for the bookings table in PostgreSQL:


   ```sql
   CREATE TABLE IF NOT EXISTS public.bookings
   (
       id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
       additional_charges double precision,
       applicant_name character varying(255) COLLATE pg_catalog."default",
       application_no character varying(255) COLLATE pg_catalog."default",
       booking_type character varying(255) COLLATE pg_catalog."default",
       email character varying(255) COLLATE pg_catalog."default",
       hall character varying(255) COLLATE pg_catalog."default",
       mobile character varying(255) COLLATE pg_catalog."default",
       remark character varying(255) COLLATE pg_catalog."default",
       rent double precision,
       status character varying(255) COLLATE pg_catalog."default",
       time_slot character varying(255) COLLATE pg_catalog."default",
       purpose character varying(255) COLLATE pg_catalog."default",
       total double precision,
       date date,
       CONSTRAINT bookings_pkey PRIMARY KEY (id)
   )
   ```
### Video Demonstration of Project :
   ```bash
   https://www.loom.com/share/31bceff585004acc9ad46b88e90ed110?sid=ac2b47ff-1a06-4a5c-a438-02058da6b34a
   ```


