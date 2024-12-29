# Hall Booking System

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

` ```bash
git clone https://github.com/your-username/hall-booking-system.git
`
### 2. Setup the Backend (Spring Boot)

- **Install Java 11 or higher:**

  Download and install Java from [here](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).

- **Configure Database:**

  Install PostgreSQL and create a new database called `bookings`.

  In the `src/main/resources/application.properties` file of the backend, update the PostgreSQL connection details:

 ` ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/bookings
  spring.datasource.username=your-username
  spring.datasource.password=your-password
`




