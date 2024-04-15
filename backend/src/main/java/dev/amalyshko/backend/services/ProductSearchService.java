package dev.amalyshko.backend.services;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class ProductSearchService {

    private final String urlBase = "https://rozetka.com.ua/ua/notebooks/c80004/";
    public String parsePage(TreeMap<String, Object> jsonMap) {
        StringBuilder urlBuilder = new StringBuilder(urlBase);

        for (Map.Entry<String, Object> entry : jsonMap.entrySet()) {
            urlBuilder.append(entry.getKey()).append("=");
            if (entry.getValue() instanceof List<?> values) {
                for (int i = 0; i < values.size(); i++) {
                    urlBuilder.append(values.get(i));
                    if (i < values.size() - 1) {
                        urlBuilder.append(",");
                    }
                }
            } else {
                urlBuilder.append(entry.getValue());
            }
            urlBuilder.append(";");
        }
        urlBuilder.append("sort=cheap/");
        return urlBuilder.toString();
    }
}
