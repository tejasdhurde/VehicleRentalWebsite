package com.rentify.service;

import com.rentify.dao.BookingRepository;
import com.rentify.dao.UserRepository;
import com.rentify.dao.VehicleRepository;
import com.rentify.dto.BookingOwnerViewResponse;
import com.rentify.dto.BookingRequest;
import com.rentify.dto.BookingResponse;
import com.rentify.entity.Booking;
import com.rentify.entity.BookingStatus;
import com.rentify.entity.User;
import com.rentify.entity.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired 
    private BookingRepository bookingRepository;
    @Autowired 
    private VehicleRepository vehicleRepository;
    @Autowired 
    private UserRepository userRepository;

   
    @Override
    @Transactional
    public BookingResponse createBooking(Long userId, BookingRequest request) {
        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new IllegalArgumentException("Start date and end date must not be null.");
        }

        User customer = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new UsernameNotFoundException("Vehicle not found"));

        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        if (days <= 0) {
            throw new IllegalArgumentException("Invalid booking duration.");
        }

        List<Booking> confirmedConflicts = bookingRepository.findConflictingConfirmedBookings(
                vehicle.getVehicleId(), request.getStartDate(), request.getEndDate());

        if (!confirmedConflicts.isEmpty()) {
            StringBuilder message = new StringBuilder("❌ Vehicle is already booked during the following confirmed date ranges: ");
            for (Booking b : confirmedConflicts) {
                message.append(String.format("[%s to %s], ", b.getStartDate(), b.getEndDate()));
            }
            throw new IllegalStateException(message.substring(0, message.length() - 2));
        }



        BigDecimal totalCost = vehicle.getPricePerDay().multiply(BigDecimal.valueOf(days));

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setVehicle(vehicle);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setTotalCost(totalCost);
        booking.setStatus(BookingStatus.PENDING);

        return mapToResponse(bookingRepository.save(booking));
    }


    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getBookingsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return bookingRepository.findByCustomer(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingResponse updateBookingByCustomer(Long userId, Long bookingId, BookingRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getCustomer().getUserId().equals(userId)) {
            throw new SecurityException("Not authorized to update this booking");
        }

        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new IllegalArgumentException("Start and end dates must not be null.");
        }

        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        if (days <= 0) {
            throw new IllegalArgumentException("Invalid booking duration.");
        }

        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setTotalCost(booking.getVehicle().getPricePerDay().multiply(BigDecimal.valueOf(days)));

        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    @Transactional
    public void deleteBookingByCustomer(Long userId, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getCustomer().getUserId().equals(userId)) {
            throw new SecurityException("Not authorized to delete this booking");
        }

        // Make vehicle available again
        booking.getVehicle().setAvailable(true);
        vehicleRepository.save(booking.getVehicle());

        bookingRepository.delete(booking);
    }

    @Override
    @Transactional
    public BookingResponse updateBookingStatusByOwner(Long ownerId, Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getVehicle().getOwner().getUserId().equals(ownerId)) {
            throw new SecurityException("Not authorized to update this booking");
        }

        booking.setStatus(status);
        
        if (status == BookingStatus.CONFIRMED) {
            booking.getVehicle().setAvailable(false);
            vehicleRepository.save(booking.getVehicle());

            List<Booking> pendingConflicts = bookingRepository.findConflictingPendingBookings(
                    booking.getVehicle().getVehicleId(),
                    booking.getStartDate(),
                    booking.getEndDate());

            for (Booking conflict : pendingConflicts) {
                if (!conflict.getBookingId().equals(bookingId)) {
                    conflict.setStatus(BookingStatus.CANCELLED);
                }
            }

            bookingRepository.saveAll(pendingConflicts);
        }

        
        return mapToResponse(bookingRepository.save(booking));
    }

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse res = new BookingResponse();
        res.setBookingId(booking.getBookingId());
        res.setVehicleId(booking.getVehicle().getVehicleId());
        res.setVehicleTitle(booking.getVehicle().getTitle());
        res.setStartDate(booking.getStartDate());
        res.setEndDate(booking.getEndDate());
        res.setTotalCost(booking.getTotalCost());
        res.setStatus(booking.getStatus());
        return res;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingOwnerViewResponse> getBookingsByOwner(Long ownerId) {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getVehicle().getOwner().getUserId().equals(ownerId))
                .map(booking -> {
                    BookingOwnerViewResponse dto = new BookingOwnerViewResponse();
                    dto.setBookingId(booking.getBookingId());
                    dto.setVehicleId(booking.getVehicle().getVehicleId());
                    dto.setVehicleTitle(booking.getVehicle().getTitle());
                    dto.setCustomerId(booking.getCustomer().getUserId());
                    dto.setCustomerName(booking.getCustomer().getName());
                    dto.setStartDate(booking.getStartDate());
                    dto.setEndDate(booking.getEndDate());
                    dto.setTotalCost(booking.getTotalCost());
                    dto.setStatus(booking.getStatus());
                    dto.setCreatedAt(booking.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

   
   // @Scheduled(cron = "0 0 1 * * *")
    @Scheduled(cron = "*/10 * * * * *")
    @Transactional
    public void autoCompleteExpiredBookings() {
        List<Booking> expiredBookings = bookingRepository
                .findByStatusAndEndDateBefore(BookingStatus.CONFIRMED, LocalDate.now());

        for (Booking booking : expiredBookings) {
            booking.setStatus(BookingStatus.COMPLETED);
            booking.getVehicle().setAvailable(true);
            vehicleRepository.save(booking.getVehicle());
        }

        bookingRepository.saveAll(expiredBookings);
    }
}
