import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        applicantName: '',
        email: '',
        mobile: '',
        date: '',
        rent: '',
        additionalCharges: '',
        hall: '',
        bookingType: '',
        timeSlot: '',
        status: '',
        applicationNo: '',
        remark: '',
        total: 0,
        purpose: ''
    });

    const [customTimeSlot, setCustomTimeSlot] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timeSlotOptions = ['Morning 7 AM - 12 PM', 'Afternoon 12 PM - 4 PM', 'Evening 4 PM - 12 AM', 'Custom'];
    const hallOptions = ['P.D. Hall', 'Mangal Hall', 'Sanidhya Hall'];
    const bookingTypeOptions = ['Offline', 'Online'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCustomTimeSlotChange = (e) => {
        setCustomTimeSlot(e.target.value);
    };

    const calculateTotal = () => {
        const total = parseFloat(formData.rent || 0) + parseFloat(formData.additionalCharges || 0);
        setFormData({ ...formData, total });
    };

    useEffect(() => {
        calculateTotal();
    }, [formData.rent, formData.additionalCharges]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.applicantName.trim()) newErrors.applicantName = 'Applicant Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.rent) newErrors.rent = 'Rent is required';
        if (!formData.hall.trim()) newErrors.hall = 'Hall is required';
        if (!formData.bookingType.trim()) newErrors.bookingType = 'Booking Type is required';
        if (!formData.timeSlot.trim()) newErrors.timeSlot = 'Time Slot is required';
        if (formData.timeSlot === 'Custom' && !customTimeSlot.trim()) {
            newErrors.timeSlot = 'Custom time slot is required';
        }
        if (!formData.status.trim()) newErrors.status = 'Status is required';
        if (!formData.applicationNo.trim()) newErrors.applicationNo = 'Application Number is required';
        if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            const finalFormData = { ...formData, timeSlot: customTimeSlot || formData.timeSlot };

            // Sending data to server
            await axios.post('http://localhost:8080/api/bookings', finalFormData);
            
            // On success, clear the form and navigate
            alert('Booking added successfully!');
            setFormData({
                applicantName: '',
                email: '',
                mobile: '',
                date: '',
                rent: '',
                additionalCharges: '',
                hall: '',
                bookingType: '',
                timeSlot: '',
                status: '',
                applicationNo: '',
                remark: '',
                total: 0,
                purpose: ''
            });
            navigate('/');
        } catch (error) {
            console.error('Error adding booking!', error);
            alert('Failed to add booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toStatementCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
                  .replace(/^./, (match) => match.toUpperCase()); // Capitalize first letter
    };

    return (
        <div>
            <h2>Add Booking</h2>
            <form onSubmit={handleSubmit} className="add-booking-form">
                <table>
                    <tbody>
                        {/* Form rows for inputs */}
                         {['applicantName', 'email', 'mobile', 'date', 'rent', 'additionalCharges', 'purpose', 'status', 'applicationNo'].map(field => (
                            <tr key={field}>
                                <td><label>{toStatementCase(field)}:</label></td>
                                <td>
                                    <input
                                        type={field === 'email' ? 'email' : field === 'date' ? 'date' : 'text'}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                    {errors[field] && <span style={{ color: 'red' }}>{errors[field]}</span>}
                                </td>
                            </tr>
                        ))}
                        
                        {/* Hall selection */}
                        <tr>
                            <td><label>Hall:</label></td>
                            <td>
                                <select
                                    name="hall"
                                    value={formData.hall}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a Hall</option>
                                    {hallOptions.map((hall) => (
                                        <option key={hall} value={hall}>
                                            {hall}
                                        </option>
                                    ))}
                                </select>
                                {errors.hall && <span style={{ color: 'red' }}>{errors.hall}</span>}
                            </td>
                        </tr>
                        
                        {/* Booking Type selection */}
                        <tr>
                            <td><label>Booking Type:</label></td>
                            <td>
                                <select
                                    name="bookingType"
                                    value={formData.bookingType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Booking Type</option>
                                    {bookingTypeOptions.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.bookingType && <span style={{ color: 'red' }}>{errors.bookingType}</span>}
                            </td>
                        </tr>
                        
                        {/* Time Slot */}
                        <tr>
                            <td><label>Time Slot:</label></td>
                            <td>
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === 'Custom') {
                                            setFormData({ ...formData, timeSlot: 'Custom' });
                                        } else {
                                            setFormData({ ...formData, timeSlot: value });
                                        }
                                    }}
                                >
                                    <option value="">Select Time Slot</option>
                                    {timeSlotOptions.map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>

                                {formData.timeSlot === 'Custom' && (
                                    <input
                                        type="text"
                                        placeholder="Enter custom time slot"
                                        value={customTimeSlot}
                                        onChange={handleCustomTimeSlotChange}
                                        name="timeSlot"
                                    />
                                )}
                                {errors.timeSlot && <span style={{ color: 'red' }}>{errors.timeSlot}</span>}
                            </td>
                        </tr>
                        
                        {/* Remark */}
                        <tr>
                            <td><label>Remark:</label></td>
                            <td>
                                <textarea
                                    name="remark"
                                    value={formData.remark}
                                    onChange={handleChange}
                                ></textarea>
                            </td>
                        </tr>
                        
                        {/* Total */}
                        <tr>
                            <td><label>Total:</label></td>
                            <td><input type="number" value={formData.total} readOnly /></td>
                        </tr>
                    </tbody>
                </table>

                <div className="submit-btn">
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </div>
            </form>
            <div className="back-btn">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default Booking;
