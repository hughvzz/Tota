-- Drops the register if it exists currently --
DROP DATABASE IF EXISTS register;
-- Creates the "register" database --
CREATE DATABASE register;

USE register;

-- Created the table "User" 
CREATE TABLE user  (

  id int AUTO_INCREMENT,
  coolness_points INT ,
  firstName varchar(30) NOT NULL,
  lastName varchar(30) NOT NULL,
  email varchar(30) NOT NULL,
  PASSWORD varchar(30) NOT NULL,
  address varchar(100) NOT NULL,
  addressTwo varchar(50) NOT NULL,
  city varchar(30) NOT NULL,
  STATE varchar(30) NOT NULL,
  zip INT,
  DATETIME,
  CURRENT_DATE 

  PRIMARY KEY(id)
);
