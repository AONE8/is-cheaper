package dev.amalyshko.backend.controllers;

import dev.amalyshko.backend.payload.MessageResponse;
import dev.amalyshko.backend.repository.UserRepository;
import dev.amalyshko.backend.security.jwt.JwtUtils;
import dev.amalyshko.backend.services.ProductSearchService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ProductSearchService productSearchService;

    @PostMapping("/search")
    public ResponseEntity<?> searchProduct(@RequestBody TreeMap<String, Object> jsonMap) {

        String url = productSearchService.parsePage(jsonMap);

        try {
            Connection.Response response = Jsoup.connect(url).followRedirects(false).execute();
            int statusCode = response.statusCode();
            System.out.println("HTTP Status Code: " + statusCode);

            if (statusCode == HttpURLConnection.HTTP_MOVED_PERM || statusCode == HttpURLConnection.HTTP_MOVED_TEMP) {
                String redirectUrl = response.header("Location");
                System.out.println("Redirected to: " + redirectUrl);
                if (Objects.equals(redirectUrl, "https://rozetka.com.ua/ua/notebooks/c80004/sort=cheap/")) {
                    return ResponseEntity.status(HttpURLConnection.HTTP_NOT_FOUND).body(new MessageResponse("Product not found"));
                }
            }

           return ResponseEntity.ok(new MessageResponse(url));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }
}
