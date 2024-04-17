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

        Element productNode = doc.selectFirst("body > rz-app-root > div > div > rz-category > div > main > rz-catalog > div > div > section > rz-grid > ul > li:nth-child(1)");

        String productName = productNode.selectFirst("a.product-link.goods-tile__heading").attr("title");

        String productLocationUrl = productNode.selectFirst("a.product-link.goods-tile__heading").attr("href");

        String productPrice = productNode.selectFirst("span.goods-tile__price-value").text().replaceAll("[^\\d.]", "");

        String productImgUrl = productNode.selectFirst("img.ng-lazyloaded").attr("src");

        //System.out.println("Product name: "+ productName + "; Product location: "+productLocationUrl + "; Product price:"+ productPrice+"; Product Img Url:" + productImgUrl);

        return new Product(productName, productImgUrl, productLocationUrl, new BigDecimal(productPrice));
    }
}
