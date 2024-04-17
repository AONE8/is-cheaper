package dev.amalyshko.backend.controllers;

import dev.amalyshko.backend.models.Product;
import dev.amalyshko.backend.models.User;
import dev.amalyshko.backend.payload.MessageResponse;
import dev.amalyshko.backend.repository.UserRepository;
import dev.amalyshko.backend.security.jwt.JwtUtils;
import dev.amalyshko.backend.services.ProductParseService;
import dev.amalyshko.backend.services.ProductSearchService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    ProductParseService productParseService;

    @PostMapping("/search")
    public ResponseEntity<?> searchProduct(@RequestBody TreeMap<String, Object> jsonMap) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String username = authentication.getName();

            User user = userRepository.findByUsername(username).orElseThrow(() -> new Exception("Found No User"));

            String url = productSearchService.parsePage(jsonMap);

            Connection.Response response = Jsoup.connect(url).followRedirects(false).execute();
            int statusCode = response.statusCode();
            System.out.println("HTTP Status Code: " + statusCode);

            if (statusCode == HttpURLConnection.HTTP_MOVED_PERM || statusCode == HttpURLConnection.HTTP_MOVED_TEMP) {
                String redirectUrl = response.header("Location");
                System.out.println("Redirected to: " + redirectUrl);
                if (Objects.equals(redirectUrl, "/ua/notebooks/c80004/sort=cheap/")) {
                    return ResponseEntity.status(HttpURLConnection.HTTP_NOT_FOUND).body(new MessageResponse("Product not found"));
                }
            }

            Product product = productParseService.parse(url);

            user.getProducts().add(product);

            userRepository.save(user);

           return ResponseEntity.ok(product);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> historyProducts()  {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String username = authentication.getName();

            User user = userRepository.findByUsername(username).orElseThrow(() -> new Exception("Found No User"));

            return ResponseEntity.ok(user.getProducts());

        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));

        }
    }
}
