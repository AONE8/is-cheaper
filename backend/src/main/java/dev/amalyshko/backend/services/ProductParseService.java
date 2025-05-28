package dev.amalyshko.backend.services;

import dev.amalyshko.backend.models.Product;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;

@Service
public class ProductParseService {

    public Product parse(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();

        Element productNode = doc.selectFirst("body > rz-app-root > div > div.outlet-wrapper > rz-category > div > main > rz-catalog-layout > div.d-flex > section > rz-category-goods > div:nth-child(1)");

        String productName = productNode.selectFirst("a.tile-image-host").attr("title");

        String productLocationUrl = productNode.selectFirst("a.tile-image-host").attr("href");

        String productPrice = productNode.selectFirst("div.price").text().replaceAll("[^\\d.]", "");

        String productImgUrl = productNode.selectFirst("img.tile-image").attr("src");

        return new Product(productName, productImgUrl, productLocationUrl, new BigDecimal(productPrice));
    }
}
