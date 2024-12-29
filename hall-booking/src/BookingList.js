import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookings');
                console.log(response.data);  
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings!', error);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/bookings/${id}`);
            setBookings(bookings.filter((booking) => booking.id !== id)); 
        } catch (error) {
            console.error('Error deleting booking!', error);
        }
    };

    const downloadCSV = () => {
        const headers = [
            'Applicant Name', 'Email', 'Mobile', 'Date', 'Total', 'Purpose',
            'Hall', 'Booking Type', 'Time Slot', 'Status', 'Application No', 'Remark'
        ];

        const rows = bookings.map((booking) => [
            booking.applicantName,
            booking.email,
            booking.mobile,
            booking.date,
            booking.total,
            booking.purpose,
            booking.hall,
            booking.bookingType,
            booking.timeSlot,
            booking.status,
            booking.applicationNo,
            booking.remark,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'bookings.csv';
        link.click();
    };

    return (
        <div>
            <h2>Hall Booking List</h2>
            <button className="add-booking-btn" onClick={() => navigate('/add-booking')}>Add Booking</button>
            <p>Total Bookings: {bookings.length}</p>
            <table
                border="1"
                style={{
                    marginTop: '10px',
                    width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'left',
                    marginTop: '25px',
                }}
            >
                <thead>
                    <tr>
                        <th>Applicant Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Date</th> 
                        <th>Total</th> 
                        <th>Purpose</th> 
                        <th>Hall</th>
                        <th>Booking Type</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Application No</th>
                        <th>Remark</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="13">No bookings available</td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <tr key={booking.id}> 
                                <td>{booking.applicantName}</td>
                                <td>{booking.email}</td>
                                <td>{booking.mobile}</td>
                                <td>{booking.date}</td> 
                                <td>{booking.total}</td> 
                                <td>{booking.purpose}</td> 
                                <td>{booking.hall}</td>
                                <td>{booking.bookingType}</td>
                                <td>{booking.timeSlot}</td>
                                <td>{booking.status}</td>
                                <td>{booking.applicationNo}</td>
                                <td>{booking.remark}</td>
                                <td>
                                    <button className="edit-button" onClick={() => navigate(`/edit-booking/${booking.id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(booking.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div style={{ marginTop: '20px', textAlign: 'right', marginRight: '5%' }}>
                <button onClick={downloadCSV} className="download-csv-btn">
                    Download CSV
                </button>
            </div>
        </div>
    );
};

export default BookingList;
