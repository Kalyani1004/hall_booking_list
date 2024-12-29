import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    mobile: "",
    date: "",
    rent: "",
    additionalCharges: "",
    total: "",
    hall: "",
    bookingType: "",
    timeSlot: "",
    status: "",
    applicationNo: "",
    remark: "",
    purpose: "",
  });
  const [customTimeSlot, setCustomTimeSlot] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/${id}`);
        setFormData(response.data);
        if (!["Morning", "Afternoon", "Evening", "Custom"].includes(response.data.timeSlot)) {
          setCustomTimeSlot(response.data.timeSlot);
          setFormData({ ...response.data, timeSlot: "Custom" });
        }
      } catch (error) {
        console.error("Error fetching booking!", error);
      }
    };
    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomTimeSlotChange = (e) => {
    setCustomTimeSlot(e.target.value);
    setFormData({ ...formData, timeSlot: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.applicantName.trim()) newErrors.applicantName = "Applicant Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.rent) newErrors.rent = "Rent is required";
    if (!formData.hall.trim()) newErrors.hall = "Hall is required";
    if (!formData.bookingType.trim()) newErrors.bookingType = "Booking Type is required";
    if (!formData.timeSlot.trim()) newErrors.timeSlot = "Time Slot is required";
    if (!formData.status.trim()) newErrors.status = "Status is required";
    if (!formData.applicationNo.trim()) newErrors.applicationNo = "Application Number is required";
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const finalData = {
        ...formData,
        timeSlot: formData.timeSlot === "Custom" ? customTimeSlot : formData.timeSlot,
      };
      await axios.put(`http://localhost:8080/api/bookings/${id}`, finalData);
      alert("Booking updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating booking!", error);
      alert("Failed to update booking. Please try again.");
    }
  };

  return (
    <div className="edit-form1">
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <table>
          <tbody>
            <tr>
              <td><label>Applicant Name:</label></td>
              <td>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                />
                {errors.applicantName && <span style={{ color: "red" }}>{errors.applicantName}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Email:</label></td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Mobile:</label></td>
              <td>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <span style={{ color: "red" }}>{errors.mobile}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Date:</label></td>
              <td>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <span style={{ color: "red" }}>{errors.date}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Rent:</label></td>
              <td>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                />
                {errors.rent && <span style={{ color: "red" }}>{errors.rent}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Additional Charges:</label></td>
              <td>
                <input
                  type="number"
                  name="additionalCharges"
                  value={formData.additionalCharges}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label>Total:</label></td>
              <td>
                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td><label>Purpose:</label></td>
              <td>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                />
                {errors.purpose && <span style={{ color: "red" }}>{errors.purpose}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Hall:</label></td>
              <td>
                <input
                  type="text"
                  name="hall"
                  value={formData.hall}
                  onChange={handleChange}
                />
                {errors.hall && <span style={{ color: "red" }}>{errors.hall}</span>}
              </td>
            </tr>
            <tr>
              <td><label>Time Slot:</label></td>
              <td>
                <select  style={{width:'50%'}}
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="">Select Time Slot</option>
                  <option value="Morning">Morning (7 AM - 12 PM)</option>
                  <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening">Evening (4 PM - 12 AM)</option>
                  <option value="Custom">Custom</option>
                </select>
                {formData.timeSlot === "Custom" && (
                  <input
                    type="text"
                    name="customTimeSlot"
                    value={customTimeSlot}
                    onChange={handleCustomTimeSlotChange}
                    placeholder="Enter custom time slot"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update</button>
      </form>
      <div className="back-btn">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
    </div>
  );
};

export default EditBooking;
