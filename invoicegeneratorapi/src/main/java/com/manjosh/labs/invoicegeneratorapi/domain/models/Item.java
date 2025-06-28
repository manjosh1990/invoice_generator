package com.manjosh.labs.invoicegeneratorapi.domain.models;

import lombok.Data;

@Data
public class Item {
    private String name;
    private String description;
    private double price;
    private int quantity;
}
