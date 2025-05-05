-- #########################################################
-- # Database: femininity_platform                           #
-- # Purpose: Create tables, insert sample data              #
-- # Submitted by: Nancy Kerubo                               #
-- #########################################################
-- #########################################################
-- # Step 1: Create the database                             #
-- #########################################################
CREATE DATABASE IF NOT EXISTS femininity_platform;

USE femininity_platform;

-- #########################################################
-- # Step 2: Create tables                                   #
-- #########################################################

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_type VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE IF NOT EXISTS testimonials (
    testimonial_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE IF NOT EXISTS poll_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_text VARCHAR(255) NOT NULL,
    votes INT DEFAULT 0
);
CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vote_type ENUM('inspired', 'neutral', 'not_inspired') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- #########################################################
-- # Step 3: Insert sample data                              #
-- #########################################################

INSERT INTO
    users (name, email)
VALUES
    ('Ada Nwoke', 'ada@example.com'),
    ('Lina James', 'lina@example.com'),
    ('Fatima Yusuf', 'fatima@example.com') ON DUPLICATE KEY
UPDATE
    email = email;


INSERT INTO
    bookings (user_id, session_type, booking_date)
VALUES
    (1, 'One-on-One Coaching', '2025-05-06'),
    (2, 'Group Workshop', '2025-05-07'),
    (3, 'Inner Healing Session', '2025-05-08');


INSERT INTO
    testimonials (user_id, message)
VALUES
    (
        1,
        'This space helped me reconnect with my softness and rediscover my strength.'
    ),
    (
        2,
        'After one session, I felt seen, validated, and deeply empowered.'
    ),
    (
        3,
        'I finally feel safe being fully feminine. Thank you for creating this space.'
    );


INSERT INTO
    poll_options (option_text, votes)
VALUES
    ('Softness & Grace', 5),
    ('Strength in Vulnerability', 3),
    ('Emotional Depth', 2);