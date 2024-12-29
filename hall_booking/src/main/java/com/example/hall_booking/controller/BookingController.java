package com.example.hall_booking.controller;

import com.example.hall_booking.model.Booking;
import com.example.hall_booking.repo.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        // Ensure total is calculated before saving
        booking.setTotal();  // This method will automatically set the total based on rent and additionalCharges
        return bookingRepository.save(booking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setApplicantName(bookingDetails.getApplicantName());
                    booking.setEmail(bookingDetails.getEmail());
                    booking.setMobile(bookingDetails.getMobile());
                    booking.setDate(bookingDetails.getDate());  // Updating the combined date field
                    booking.setRent(bookingDetails.getRent());
                    booking.setAdditionalCharges(bookingDetails.getAdditionalCharges());
                    booking.setHall(bookingDetails.getHall());
                    booking.setBookingType(bookingDetails.getBookingType());
                    booking.setTimeSlot(bookingDetails.getTimeSlot());
                    booking.setStatus(bookingDetails.getStatus());
                    booking.setApplicationNo(bookingDetails.getApplicationNo());
                    booking.setRemark(bookingDetails.getRemark());
                    booking.setPurpose(bookingDetails.getPurpose());  // Updating purpose field
                    booking.setTotal();  // Recalculate the total whenever rent or additionalCharges are updated
                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    bookingRepository.delete(booking);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
