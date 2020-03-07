package com.learn.OnlineBookMarket.entity;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@ToString
@Setter
@Table(name="tbl_book")
public class Book {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String sku;
	
	private String name;
	
	private String description;
	
	@Column(name="unit_price")
	private BigDecimal unitPrice;
	
	@Column(name="image_url")
	private String imageUrl;
	
	
	private boolean active;
	
	@Column(name="units_in_stock")
	private int unitsInStock;
	
	@Column(name="date_created")
	private  Date dateCreated;
	
	@Column(name="last_updated")
	private Date lastUpdated;
	
	@ManyToOne
	@JoinColumn(name="category_id",nullable=false )
	private BookCategory category;
	
}
