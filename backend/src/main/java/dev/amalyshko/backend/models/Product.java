package dev.amalyshko.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private String productName;
    private String imgUrl;
    private String locationUrl;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal price;


}
