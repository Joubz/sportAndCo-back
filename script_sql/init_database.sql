/*==============================================================*/
/* SCRIPT Authors : Nathan JOUBERT & Allan Mendjeli             */
/* This script is used when the datase is initialised, only     */
/* one time                                                     */
/*==============================================================*/

CREATE DATABASE IF NOT EXISTS sport_and_co;
USE sport_and_co;

/*==============================================================*/
CREATE TABLE EXEMPLE (
    EXEMPLE_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    TITLE VARCHAR(100) COMMENT '',
    PRIMARY KEY auto_increment (EXEMPLE_ID)
);

/*==============================================================*/
CREATE TABLE ADMINISTRATOR (
    ADMINISTRATOR_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    LOGIN VARCHAR(50) COMMENT '' UNIQUE,
    PASSWORD VARCHAR(250) COMMENT '',
    PRIMARY KEY auto_increment (ADMINISTRATOR_ID)
);

/*==============================================================*/
CREATE TABLE EQUIPMENT (
    EQUIPMENT_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    RENTER_ID INT NOT NULL COMMENT '',
    CATEGORY_ID INT NOT NULL COMMENT '',
    EQUIPMENT_NAME VARCHAR(100) COMMENT '',
    DESCRIPTION VARCHAR(1000) COMMENT '',
    CREATION_DATE VARCHAR(100) COMMENT '',
    PRICE INT NOT NULL COMMENT '',
    TOTAL_QUANTITY INT NOT NULL COMMENT '',
    AVAILABLE_QUANTITY INT NOT NULL COMMENT '',
    IMAGE_LINK VARCHAR(500) COMMENT '',
    OTHER_TEXT VARCHAR(1000) COMMENT '',
    PRIMARY KEY auto_increment (EQUIPMENT_ID)
);

/*==============================================================*/
CREATE TABLE CATEGORY (
    CATEGORY_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    CATEGORY_NAME VARCHAR(50) COMMENT '',
    PRIMARY KEY auto_increment (CATEGORY_ID)
);

/*==============================================================*/
CREATE TABLE RENTER (
    RENTER_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    PASSWORD VARCHAR(250) COMMENT '',
    ACCEPTED varchar(1) COMMENT '',
    COMPANY_NAME VARCHAR(250) COMMENT '',
    FIRST_NAME VARCHAR(250) COMMENT '',
    LAST_NAME VARCHAR(250) COMMENT '',
    EMAIL VARCHAR(250) COMMENT '',
    PHONE VARCHAR(250) COMMENT '',
    BIRTH_DATE VARCHAR(100) COMMENT '',
    ADDRESS VARCHAR(250) COMMENT '',
    ADDITIONAL_ADDRESS VARCHAR(250) COMMENT '',
    POSTAL_CODE VARCHAR(100) COMMENT '',
    CITY VARCHAR(250) COMMENT '',
    IMAGE_LINK VARCHAR(500) COMMENT '',
    PRIMARY KEY auto_increment (RENTER_ID)
);

/*==============================================================*/
CREATE TABLE CLIENT (
    CLIENT_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    PASSWORD VARCHAR(250) COMMENT '',
    FIRST_NAME VARCHAR(250) COMMENT '',
    LAST_NAME VARCHAR(250) COMMENT '',
    EMAIL VARCHAR(250) COMMENT '',
	PHONE VARCHAR(250) COMMENT '',
    BIRTH_DATE VARCHAR(100) COMMENT '',
    ADDRESS VARCHAR(250) COMMENT '',
    ADDITIONAL_ADDRESS VARCHAR(250) COMMENT '',
    POSTAL_CODE VARCHAR(100) COMMENT '',
    CITY VARCHAR(250) COMMENT '',
    IMAGE_LINK VARCHAR(500) COMMENT '',
    PRIMARY KEY auto_increment (CLIENT_ID)
);

/*==============================================================*/
CREATE TABLE EQUIPMENT_ORDER (
    ORDER_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    CLIENT_ID INT NOT NULL COMMENT '',
    EQUIPMENT_ID INT NOT NULL COMMENT '',
    BILL_ID INT NOT NULL COMMENT '',
    START_DATE DATE COMMENT '',
    FINISH_DATE DATE COMMENT '',
    RENT_DATE DATE COMMENT '',
    ADDRESS VARCHAR(250) COMMENT '',
    QUANTITY_RENTED INT NOT NULL COMMENT '',
    PRIMARY KEY auto_increment (ORDER_ID)
);


/*==============================================================*/
CREATE TABLE BILL (
    BILL_ID INT NOT NULL AUTO_INCREMENT COMMENT '',
    DESCRIPTION VARCHAR(50) COMMENT '',
    BILL_DATE VARCHAR(100) COMMENT '',
    BILL_PRICE INT NOT NULL COMMENT '',
    PRIMARY KEY auto_increment (BILL_ID)
);

/*==============================================================*/
/* Create Foreign Key                                           */
/*==============================================================*/
alter table EQUIPMENT add constraint FK_EQUIPMENT_CONCERNS_CATEGORY_ foreign key (CATEGORY_ID)
      references CATEGORY (CATEGORY_ID) on delete restrict on update restrict;
      
alter table EQUIPMENT add constraint FK_USER_CREATE_EQUIPMENT_ foreign key (RENTER_ID)
      references RENTER (RENTER_ID) on delete restrict on update restrict;
      
alter table EQUIPMENT_ORDER add constraint FK_ORDER_CONCERNS_EQUIPMENT_ foreign key (EQUIPMENT_ID)
      references EQUIPMENT (EQUIPMENT_ID) on delete restrict on update restrict;
      
alter table EQUIPMENT_ORDER add constraint FK_ORDER_CONCERNS_CLIENT_ foreign key (CLIENT_ID)
      references RENTING_CLIENT (CLIENT_ID) on delete restrict on update restrict;
      
alter table EQUIPMENT_ORDER add constraint FK_ORDER_CONCERNS_BILL_ foreign key (BILL_ID)
      references BILL (BILL_ID) on delete restrict on update restrict;
