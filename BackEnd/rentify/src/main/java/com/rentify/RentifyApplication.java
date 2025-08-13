package com.rentify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry; // New import
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // New import
import org.springframework.beans.factory.annotation.Value; // New import for @Value

@SpringBootApplication
@EnableScheduling 
public class RentifyApplication implements WebMvcConfigurer { // Implement WebMvcConfigurer

    @Value("${file.upload-dir}")
    private String uploadDir; 

    public static void main(String[] args) {
        SpringApplication.run(RentifyApplication.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir);
    }
}