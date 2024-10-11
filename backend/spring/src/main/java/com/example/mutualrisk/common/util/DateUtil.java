package com.example.mutualrisk.common.util;

import com.example.mutualrisk.common.enums.TimeInterval;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DateUtil {

    public LocalDateTime getPastDate(LocalDateTime dateTime, TimeInterval timeInterval, int dDate) {
        if (timeInterval == TimeInterval.DAY) {
            return dateTime.minusDays(dDate);
        }
        else if (timeInterval == TimeInterval.MONTH) {
            return dateTime.minusMonths(dDate);
        }
        else if (timeInterval == TimeInterval.WEEK){
            return dateTime.minusWeeks(dDate);
        }
        else {
            return dateTime.minusYears(dDate);
        }
    }

    public LocalDateTime getFutureDate(LocalDateTime dateTime, TimeInterval timeInterval, int dDate) {
        if (timeInterval == TimeInterval.DAY) {
            return dateTime.plusDays(dDate);
        }
        else if (timeInterval == TimeInterval.MONTH) {
            return dateTime.plusMonths(dDate);
        }
        else {
            return dateTime.plusYears(dDate);
        }
    }
}
