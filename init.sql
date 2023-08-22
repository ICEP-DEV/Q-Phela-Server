-- Citizen Table
CREATE TABLE citizen (
    citizen_id INT PRIMARY KEY AUTO_INCREMENT,
    Citizen_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
INSERT INTO citizen (citizen_name, email, password)
VALUES ('citizen1', 'user1@example.com', 'password1'),
       ('citizen2', 'user2@example.com', 'password2');

-- Location table
CREATE TABLE location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);

-- Report table
CREATE TABLE Report (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    incident_type VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id)
);
-- Trip table
CREATE TABLE trip (
    trip_id INT PRIMARY KEY AUTO_INCREMENT,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id)
);
-- Alert table
CREATE TABLE alerts (
    Alert_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    date DATE,
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- Safety tips table
CREATE TABLE safety_tips (
    tip_id INT PRIMARY KEY AUTO_INCREMENT,
    tip_description TEXT,
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- Route recommendation table
CREATE TABLE recommendation (
    recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
    rec_description TEXT,
    start_location VARCHAR(255),
      citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id),
    location_id INT,
 FOREIGN KEY (location_id) REFERENCES location(location_id)
);
