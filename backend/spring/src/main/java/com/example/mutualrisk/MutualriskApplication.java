package com.example.mutualrisk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class MutualriskApplication {

    public static void main(String[] args) {
        SpringApplication.run(MutualriskApplication.class, args);
    }

}
