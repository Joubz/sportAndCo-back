/*==============================================================*/
/* CREATE VIEW EQUIPMENT_VIEW                                     */
/*==============================================================*/
DROP VIEW IF EXISTS EQUIPMENT_VIEW;
CREATE VIEW EQUIPMENT_VIEW AS
    SELECT 
        EQUIPMENT.EQUIPMENT_ID AS EQUIPMENT_ID,
        EQUIPMENT.EQUIPMENT_NAME AS EQUIPMENT_NAME,
        EQUIPMENT.DESCRIPTION AS DESCRIPTION,
        EQUIPMENT.CREATION_DATE AS CREATION_DATE,
        EQUIPMENT.PRICE AS PRICE,
        EQUIPMENT.TOTAL_QUANTITY AS TOTAL_QUANTITY,
        EQUIPMENT.AVAILABLE_QUANTITY AS AVAILABLE_QUANTITY,
        EQUIPMENT.IMAGE_LINK AS IMAGE_LINK,
        EQUIPMENT.OTHER_TEXT AS OTHER_TEXT,
	
        CATEGORY.CATEGORY_ID AS CATEGORY_ID,
        CATEGORY.CATEGORY_NAME AS CATEGORY_NAME,
        
        RENTER.RENTER_ID AS RENTER_ID,
		RENTER.COMPANY_NAME AS COMPANY_NAME,
        RENTER.FIRST_NAME AS FIRST_NAME,
        RENTER.LAST_NAME AS LAST_NAME,
        RENTER.EMAIL AS EMAIL,
        RENTER.BIRTH_DATE AS BIRTH_DATE,
        RENTER.ADDRESS AS ADDRESS,
        RENTER.ADDITIONNAL_ADDRESS AS ADDITIONNAL_ADDRESS,
        RENTER.POSTAL_CODE AS POSTAL_CODE,
        RENTER.CITY AS CITY,
        RENTER.IMAGE_LINK AS RENTER_IMAGE_LINK
    FROM
        ((EQUIPMENT
        JOIN CATEGORY ON (EQUIPMENT.CATEGORY_ID = CATEGORY.CATEGORY_ID))
        JOIN RENTER ON (EQUIPMENT.RENTER_ID = RENTER.RENTER_ID))
    GROUP BY EQUIPMENT.EQUIPMENT_ID;
    
    select * from EQUIPMENT_VIEW
    
    select * from renter
    