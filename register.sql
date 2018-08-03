-- Drops the register if it exists currently --
DROP DATABASE IF EXISTS register;
-- Creates the "register" database --
CREATE DATABASE register;

USE register;

-- Created the table "User" 
CREATE TABLE user  (

  id int AUTO_INCREMENT,
  
  firstName varchar(30) NOT NULL,
  lastName varchar(30) NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(50) NOT NULL,
  address varchar(100) NOT NULL,
  addressTwo varchar(50) NOT NULL,
  city varchar(50) NOT NULL,
  state varchar(50) NOT NULL,
  zip INT,
 dob DATE,

  PRIMARY KEY(id)
);
