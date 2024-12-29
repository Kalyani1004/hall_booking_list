package com.example.hall_booking.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings") // Use your actual table name
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String applicantName;
    private String email;
    private String mobile;
    private LocalDate date;
    private Double rent;
    private Double additionalCharges;
    private Double total; // New field for the total amount
    private String hall;
    private String bookingType;
    private String timeSlot;
    private String status;
    private String applicationNo;
    private String remark;
    private String purpose; // New field for the purpose of the booking

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getRent() {
        return rent;
    }

    public void setRent(Double rent) {
        this.rent = rent;
        updateTotal(); // Update total whenever rent changes
    }

    public Double getAdditionalCharges() {
        return additionalCharges;
    }

    public void setAdditionalCharges(Double additionalCharges) {
        this.additionalCharges = additionalCharges;
        updateTotal(); // Update total whenever additionalCharges change
    }

    public Double getTotal() {
        return total;
    }

    // Automatically calculate total based on rent and additional charges
    private void updateTotal() {
        this.total = (this.rent != null ? this.rent : 0) + (this.additionalCharges != null ? this.additionalCharges : 0);
    }

    public String getHall() {
        return hall;
    }

    public void setHall(String hall) {
        this.hall = hall;
    }

    public String getBookingType() {
        return bookingType;
    }

    public void setBookingType(String bookingType) {
        this.bookingType = bookingType;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplicationNo() {
        return applicationNo;
    }

    public void setApplicationNo(String applicationNo) {
        this.applicationNo = applicationNo;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
    public void setTotal() {
        this.total = this.rent + this.additionalCharges;
    }


}
