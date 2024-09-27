package com.example.mutualrisk.common.util;

import com.example.mutualrisk.common.enums.TimeInterval;
import org.springframework.stereotype.Component;

import java.sql.Time;
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
        else {
            return dateTime.minusYears(dDate);
        }
    }
}
