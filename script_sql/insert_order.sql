/*==============================================================*/
/* INSERT : ORDER                                               */
/*==============================================================*/
INSERT INTO EQUIPMENT_ORDER(CLIENT_ID, EQUIPMENT_ID, START_DATE, END_DATE, RENT_DATE, QUANTITY_RENTED, STATUS_RENDERED)
VALUES
(1, 1, '2021-05-02', '2021-05-17', '2021-05-02', 20, false),
(2, 1, '2021-04-07', '2021-04-08','2021-04-07', 14, true),
(3, 1, '2021-04-05', '2021-05-05','2021-04-05', 2, false),
(4, 1, '2021-05-02', '2021-05-05','2021-05-02', 1, true),
(5, 1, '2021-05-17', '2021-05-23','2021-05-02', 2, false),
(6, 1, '2021-05-18', '2021-05-26','2021-05-02', 3, false),
(7, 1, '2021-05-24', '2021-05-26','2021-05-02', 4, true),
(8, 2, '2021-05-05', '2021-05-08','2021-05-02', 24, true),
(9, 2, '2021-05-05', '2021-05-09','2021-05-02', 4, false);

/*==============================================================*/
/* INSERT : BILL                                                */
/*==============================================================*/
INSERT INTO BILL(ORDER_ID, DESCRIPTION, BILL_DATE, BILL_PRICE)
VALUES
(1, 'desc1', '2021-05-05', 90),
(2,'desc1', '2021-05-05', 120),
(3 ,'desc1', '2021-05-05', 40),
(4, 'desc1', '2021-05-05', 90),
(5,'desc1', '2021-05-05', 120),
(6 ,'desc1', '2021-05-05', 40),
(7 ,'desc1', '2021-05-05', 40),
(8 ,'desc1', '2021-05-05', 40),
(9 ,'desc1', '2021-05-05', 40);