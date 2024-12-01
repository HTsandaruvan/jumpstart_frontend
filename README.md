# JumpStart E-Commerce

A website application that provides users with information about their local
neighborhood. The application allows user to register, login using their
Facebook account through OAuth2, post a store, search another store and
user, and edit their personal profile page

## Project Overview

Users should be able to perform the following functions in the portal
  • Register in the Portal
  •	Login to the Portal
  •	Add items to the cart
  •	View cart items
  •	Update their Profile after logging in.

Administrators should be able to perform the following functions in the portal
•	Register in the Portal
•	Login to the portal
•	Add products
•	Activate / Deactivate a product post
•	Update their profile
•	View the List of Registered Users

Both Users & Administrator
•	Visit the Home Page
•	View product Listing
•	About Us Page
•	Contact Us Page
•	Terms & Conditions
•	Search for a product by Name, Brand, Serial No & Price Range


## Technologies Used & System Requirements

Backend : Java SE 11, MySQL 8, Spring Boot, Spring Security, OAuth2 (Facebook API), Restful API <br/>
Frontend : React, Tailwindcss, Axios, React-hook-form, React-router-dom <br/>
Tools : Node Js (LTS Ver)

## HOW TO RUN

### Backend

1. **Import Existing Project into Visual Studio Code** <br/>
2. **Create MySQL database**

```bash
mysql> create database jumpstart
```

3. **Setup application.yml**

```yml
server.port=8080

##Database -- connect mysql
spring.datasource.url=jdbc:mysql://localhost:3306/jumpstart
spring.datasource.username= <username>
spring.datasource.password=<password>

## CREATE,UPDATE,CREATE-DROP
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.show_sql=true

## JWT CONFIG
jwt.secret=supersecretcode69
jwt.expiration=3600000

# PayPal
paypal.clientId=AX67VeMM2VPi4OP3a21N0e2NpVtfcWcEip_AvG2dZ4ZUi6fhCrn6WR51pdGmI9vrVecbvagqDq6GRIsk
paypal.clientSecret=EFqrglys8ljsmETVur8dqi4Bk_bUH4cZu1JWD_37wjAPx9wU8yHVo2MXxzaqTQTJvrKliwz3Dw5QSMNe
paypal.mode=sandbox

##MULTIPART (MultipartProperties)
# Enable multipart uploads
spring.servlet.multipart.enabled=true
# Threshold after which files are written to disk.
spring.servlet.multipart.file-size-threshold=2KB
# Max file size.
spring.servlet.multipart.max-file-size=200MB
# Max Request Size
spring.servlet.multipart.max-request-size=215MB

```


4. . **Run Java Application**

### Frontend

1. **Import existing project to your Text Editor/IDE and run NPM Install**

```bash
npm install
```

2. **Run React application with NPM Start (Make sure the backend is also running in the localhost:8080)**

```bash
npm start
```

3. **Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

## Screenshot

<p>Terms and Condition Page</p>
<img src="./Images/Terms.png" alt="profile" width="50%"/>
