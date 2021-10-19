CREATE TABLE Role
       (
			_id VARCHAR(300) NOT NULL PRIMARY KEY ,
            role VARCHAR(100) NOT NULL UNIQUE,
            createdOnUtc TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedOnUtc TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP
       ) ENGINE = InnoDB;

CREATE TABLE User
       (
            _id VARCHAR(300) NOT NULL PRIMARY KEY,
            username VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL,
            phoneNumber VARCHAR(200) NOT NULL UNIQUE,
            firstName VARCHAR(200),
            lastName VARCHAR(200),
            email VARCHAR(200),
            zipPostalCode VARCHAR(200),
            address1 VARCHAR(200),
            company VARCHAR(200),
            country VARCHAR(200),
            stateProvince VARCHAR(200),
            address2 VARCHAR(200),
            createdOnUtc TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedOnUtc TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP
       ) ENGINE = InnoDB;

CREATE TABLE User_Role
       (
            _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            UserID VARCHAR(200) NOT NULL,
            RoleID VARCHAR(200) NOT NULL,
            createdOnUtc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedOnUtc TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE(UserID,RoleID),
            FOREIGN KEY (UserID) REFERENCES User(_id),
            FOREIGN KEY (RoleID) REFERENCES Role(_id)
       ) ENGINE = InnoDB;
