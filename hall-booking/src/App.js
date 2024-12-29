import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingList from './BookingList'; // Component for listing all bookings
import Booking from './Booking'; // Component for adding a new booking
import EditBooking from './EditBooking'; // Component for editing an existing booking
import './App.css'; // Custom styles for your app

const App = () => {
    return (
        <Router>
            <div className="App">
                {/* Routes for different pages */}
                <Routes>
                    {/* Route for displaying all bookings */}
                    <Route path="/" element={<BookingList />} />

                    {/* Route for adding a new booking */}
                    <Route path="/add-booking" element={<Booking />} />

                    {/* Route for editing a booking by ID */}
                    <Route path="/edit-booking/:id" element={<EditBooking />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;